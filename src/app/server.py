import geopandas as gpd
import pandas as pd
import xarray as xr
import os

import fastapi
import fastapi.middleware.cors
import fsspec
import pydantic

from . import plots

app = fastapi.FastAPI()
DIR = os.path.join(os.path.dirname(__file__))
DATA_HOST = "http://ecde-data.copernicus-climate.eu"

# FIXME: this is a temporary solution; an external configuration file should be used
VARIABLES = {
    "05_tropical_nights": {
        "historical_period": "1959-2022",
        "historical_version": "v0.2",
        "projections_version": "v0.3",
        "name": "tropical nights",
        "units": "days",
    },
}
PLOTS = {
    "historical_anomalies": {
        "title": "Historical variations of {temporal_aggregation} {variable_name} in {region}",
        "description": (
            "Interactive plot showing the deviations of the historical {temporal_aggregation} "
            "{variable_name} from the 1981-2010 average (also called 'Anomaly') "
            "based on the ERA5 reanalysis."
        ),
    },
    "actual_evolution": {
        "title": "Historical and projected evolution of {temporal_aggregation} {variable_name} in {region}",
        "description": (
            "Interactive plot showing the observed {temporal_aggregation} {variable_name} "
            "along with the median and likely values (66% probability of occurrence) envelope "
            "from an ensemble of climate models."
        ),
    },
    "anomaly_evolution": {
        "title": "Projected trend of {temporal_aggregation} {variable_name} in {region}",
        "description": (
            "Interactive plot showing the 30-year rolling average of the {temporal_aggregation} "
            "{variable_name} deviation from the 1981-2010 average, values are the median and likely values "
            "(66% probability of occurrence) envelope from an ensemble of climate models."
        ),
    },
    "climatology": {
        "title": "Historical and projected climatology of {variable_name} in {region}",
        "description": (
            "Interactive plot showing 30-year averages and standard deviation of observed and projected monthly values "
            "for three time horizons along with their likely values (66% probability of occurrence) envelope "
            "from an ensemble of climate models."
        ),
    },
}

REGIONAL_AGGREGATIONS = {
    "nuts": {
        "group_name": "NUTS Regions",
        "layers": {
            "nuts_2": "NUTS 2",
            "nuts_1": "NUTS 1",
            "nuts_0": "NUTS 0",
        },
    },
    "transnational": {
        "group_name": "Transnational Regions",
        "layers": {
            "eea_trans_south_west_europe": "South West Europe (SUDOE)",
            "eea_trans_northern_periphery_and_arctic": "Northern Periphery and Arctic",
            "eea_trans_north_west_europe": "North West Europe",
            "eea_trans_north_sea": "North Sea",
            "eea_trans_mediterranean": "Mediterranean (EURO MED)",
            "eea_trans_danube": "Danube",
            "eea_trans_central_europe": "Central Europe",
            "eea_trans_baltic_sea_region": "Baltic Sea Region",
            "eea_trans_atlantic_area": "Atlantic Area",
            "eea_trans_alpine_space": "Alpine Space",
            "eea_trans_adriatic_ionian": "Adriatic-Ionian",
        },
    },
    "europe": {
        "group_name": "Europe Zones",
        "layers": {
            "eea_eea_38": "EEA-38",
            "eea_eea_32": "EEA-32",
            "eea_eu_27": "EU-27",
        },
    },
}


class Plot(pydantic.BaseModel):
    title: str
    description: str
    figure: str


class LayerParams(pydantic.BaseModel):
    name: str
    type: str = pydantic.Field(default="vector")
    sourceType: str = pydantic.Field(default="vector")
    params: str | None = pydantic.Field(default=None)
    sourceParams: dict[str, str] | None = pydantic.Field(default=None)


class LayersGroup(pydantic.BaseModel):
    group: str
    layers: list[LayerParams]


def month_or_season(
    month: int | None = fastapi.Query(None),
    season: int | None = fastapi.Query(None),
):
    return month or season


def select_region(
    data: xr.DataArray, layer: str, region: str | None = None
) -> xr.DataArray:
    if layer[:4] == "nuts":
        data_selection = data.sel(nuts=region)
    elif layer[:8] == "non_nuts":
        data_selection = data.sel(countries=region)
    elif layer[:3] == "eea":
        if layer[4:9] == "trans":
            data_selection = data.isel(transnational_regions=0)
        else:
            layer_sub_id = layer[4:]
            data_selection = data.isel({layer_sub_id: 0})
    else:
        raise ValueError(f"Unknown layer {layer}")
    return data_selection


@app.get("/regions/{variable}")
def get_layers_group(
    request: fastapi.Request,
    variable: str,
    regional_aggregation: str = fastapi.Query(..., alias="regionalAggregation"),
    map_type: str = fastapi.Query("actual", alias="mapType"),
    rcp: str = fastapi.Query(...),
    horizon: str = fastapi.Query(...),
    temporal_aggregation: str = fastapi.Query(..., alias="temporalAggregation"),
    month: int | None = fastapi.Query(None),
    season: int | None = fastapi.Query(None),
) -> LayersGroup:
    temporal_aggregation_var = ""
    if month is not None:
        temporal_aggregation_var = f"&month={month}"
    elif season is not None:
        temporal_aggregation_var = f"&season={season}"
    layers_group = LayersGroup(
        group=REGIONAL_AGGREGATIONS[regional_aggregation]["group_name"],
        layers=[
            LayerParams(
                name=layer_label,
                params=layer_label,
                sourceParams={
                    "url": (
                        f"{request.base_url}geojson/{variable}/{layer_id}?mapType={map_type}"
                        f"&rcp={rcp}&horizon={horizon}&temporalAggregation={temporal_aggregation}{temporal_aggregation_var}"
                    ),
                },
            )
            for layer_id, layer_label in REGIONAL_AGGREGATIONS[regional_aggregation][
                "layers"
            ].items()
        ],
    )
    return layers_group


@app.get("/geojson/{variable}/{layer}")
def generate_geojson(
    variable: str,
    layer: str,
    map_type: str = fastapi.Query("actual", alias="mapType"),
    rcp: str = fastapi.Query(...),
    horizon: str = fastapi.Query(...),
    temporal_aggregation: str = fastapi.Query(..., alias="temporalAggregation"),
    month_or_season: int | None = fastapi.Depends(month_or_season),
) -> fastapi.responses.FileResponse:
    data_on_layer_file_path = os.path.join(DIR, f"../../public/{variable}-{layer}.json")
    if not os.path.exists(data_on_layer_file_path):
        plot = "30yrs_average"
        if map_type == "change":
            plot = f"{plot}_change"
        if horizon == "1981-01-01":
            url = (
                f"{DATA_HOST}/{variable}/plots/{variable}-historical-"
                f"{temporal_aggregation}-layer-{layer}-latitude-"
                f"{VARIABLES[variable]['historical_period']}-"
                f"{VARIABLES[variable]['historical_version']}-"
                f"{plot}.nc"
            )
        else:
            url = (
                f"{DATA_HOST}/{variable}/plots/{variable}-projections-"
                f"{temporal_aggregation}-layer-{layer}-latitude-"
                f"{VARIABLES[variable]['projections_version']}-"
                f"{plot}.nc"
            )
        with fsspec.open(f"filecache::{url}", filecache={"same_names": True}) as f:
            data = xr.open_dataarray(f.name)
        if "avg_period" in data.dims:
            data = data.sel(scenario=rcp, avg_period=horizon)
        if month_or_season is not None:
            data = data.sel(month=month_or_season)
        data_df = data.to_dataframe().reset_index().rename(columns={data.name: "value"})
        layer_file_path = os.path.join(DIR, f"../../public/{layer}.geojson")
        layer_data = gpd.read_file(layer_file_path)
        if layer[:4] == "nuts":
            layer_data = layer_data.drop(layer_data[layer_data.CNTR_CODE == "UK"].index)
            data_df = data_df.rename(columns={"nuts": "NUTS_ID"})
            data_on_layer = layer_data.merge(data_df, on="NUTS_ID")
            # Append non-NUTS data
            non_nuts_layer_file_path = os.path.join(
                DIR, "../../public/non_nuts.geojson"
            )
            non_nuts_layer_data = gpd.read_file(non_nuts_layer_file_path)
            non_nuts_data_url = url.replace(layer, "non_nuts")
            with fsspec.open(
                f"filecache::{non_nuts_data_url}", filecache={"same_names": True}
            ) as f:
                non_nuts_data = xr.open_dataarray(f.name)
            if "avg_period" in non_nuts_data.dims:
                non_nuts_data = non_nuts_data.sel(scenario=rcp, avg_period=horizon)
            if month_or_season is not None:
                non_nuts_data = non_nuts_data.sel(month=month_or_season)
            non_nuts_data_df = (
                non_nuts_data.to_dataframe()
                .reset_index()
                .rename(columns={"countries": "region_id", data.name: "value"})
            )
            non_nuts_data_on_layer = non_nuts_layer_data.merge(
                non_nuts_data_df, on="region_id"
            )
            data_on_layer = pd.concat([data_on_layer, non_nuts_data_on_layer])
        elif layer[:3] == "eea":
            if layer[4:9] == "trans":
                layer_data["OBJECTID"] = layer_data["OBJECTID"].astype(str)
                data_df = data_df.rename(columns={"transnational_regions": "OBJECTID"})
                data_on_layer = layer_data.merge(data_df, on="OBJECTID")
            else:
                layer_data["id"] = layer_data["id"].astype(str)
                data_df = data_df.rename(columns={layer[4:]: "id"})
                data_on_layer = layer_data.merge(data_df, on="id")
        data_on_layer = data_on_layer.to_crs("epsg:3035")
        data_on_layer.to_file(data_on_layer_file_path, driver="GeoJSON")
    return fastapi.responses.FileResponse(data_on_layer_file_path)


@app.get("/plots/{variable}/historical_anomalies")
def historical_anomalies(
    variable: str,
    region: str = fastapi.Query(...),
    region_name: str = fastapi.Query(..., alias="regionName"),
    selected_layer: str = fastapi.Query(..., alias="selectedLayer"),
    temporal_aggregation: str = fastapi.Query(..., alias="temporalAggregation"),
    month_or_season: int | None = fastapi.Depends(month_or_season),
) -> Plot:
    data_url = (
        f"{DATA_HOST}/{variable}/plots/{variable}-historical-"
        f"{temporal_aggregation}-layer-{selected_layer}-latitude-"
        f"{VARIABLES[variable]['historical_period']}-"
        f"{VARIABLES[variable]['historical_version']}-"
        "anomalies.nc"
    )
    with fsspec.open(f"filecache::{data_url}", filecache={"same_names": True}) as f:
        data = xr.open_dataarray(f.name)
    data_sel = select_region(data, selected_layer, region)
    if month_or_season is not None:
        data_sel = data_sel.sel(time=data_sel["time.month"] == month_or_season)
    variable_name = VARIABLES[variable]["name"].title()
    units = VARIABLES[variable]["units"]
    fig = plots.historical_anomalies(
        data_sel,
        temporal_aggregation=temporal_aggregation,
        ylabel=f"Anomaly ({units})",
        units=units,
    )
    fig_json = fig.to_json()
    plot_title = PLOTS["historical_anomalies"]["title"].format(
        temporal_aggregation=temporal_aggregation,
        variable_name=variable_name,
        region=region_name,
    )
    plot_description = PLOTS["historical_anomalies"]["description"].format(
        temporal_aggregation=temporal_aggregation, variable_name=variable_name
    )
    return Plot(
        title=plot_title,
        description=plot_description,
        figure=fig_json,
    )


@app.get("/plots/{variable}/actual_evolution")
def actual_evolution(
    variable: str,
    region: str = fastapi.Query(...),
    region_name: str = fastapi.Query(..., alias="regionName"),
    selected_layer: str = fastapi.Query(..., alias="selectedLayer"),
    temporal_aggregation: str = fastapi.Query(..., alias="temporalAggregation"),
    month_or_season: int | None = fastapi.Depends(month_or_season),
) -> Plot:
    historical_data_url = (
        f"{DATA_HOST}/{variable}/historical/{variable}-historical-"
        f"{temporal_aggregation}-layer-{selected_layer}-latitude-"
        f"{VARIABLES[variable]['historical_period']}-"
        f"{VARIABLES[variable]['historical_version']}.nc"
    )
    projections_data_url = (
        f"{DATA_HOST}/{variable}/plots/{variable}-projections-"
        f"{temporal_aggregation}-layer-{selected_layer}-latitude-"
        f"{VARIABLES[variable]['projections_version']}-"
        "quantiles.nc"
    )
    with fsspec.open(
        f"filecache::{historical_data_url}", filecache={"same_names": True}
    ) as f:
        historical_data = xr.open_dataarray(f.name)
    with fsspec.open(
        f"filecache::{projections_data_url}", filecache={"same_names": True}
    ) as f:
        projections_data = xr.open_dataarray(f.name)
    historical_sel = select_region(historical_data, selected_layer, region)
    projections_sel = select_region(projections_data, selected_layer, region)
    if month_or_season is not None:
        historical_sel = historical_sel.sel(
            time=historical_sel["time.month"] == month_or_season
        )
        projections_sel = projections_sel.sel(
            time=projections_sel["time.month"] == month_or_season
        )
    variable_name = VARIABLES[variable]["name"].title()
    units = VARIABLES[variable]["units"]
    fig = plots.actual_evolution(
        historical_sel,
        projections_sel,
        temporal_aggregation=temporal_aggregation,
        ylabel=f"{variable_name} ({units})",
        units=units,
    )
    fig_json = fig.to_json()
    plot_title = PLOTS["actual_evolution"]["title"].format(
        temporal_aggregation=temporal_aggregation,
        variable_name=variable_name,
        region=region_name,
    )
    plot_description = PLOTS["actual_evolution"]["description"].format(
        temporal_aggregation=temporal_aggregation, variable_name=variable_name
    )
    return Plot(
        title=plot_title,
        description=plot_description,
        figure=fig_json,
    )


@app.get("/plots/{variable}/anomaly_evolution")
def anomaly_evolution(
    variable: str,
    region: str = fastapi.Query(...),
    region_name: str = fastapi.Query(..., alias="regionName"),
    selected_layer: str = fastapi.Query(..., alias="selectedLayer"),
    temporal_aggregation: str = fastapi.Query(..., alias="temporalAggregation"),
    month_or_season: int | None = fastapi.Depends(month_or_season),
) -> Plot:
    projections_data_url = (
        f"{DATA_HOST}/{variable}/plots/{variable}-projections-"
        f"{temporal_aggregation}-layer-{selected_layer}-latitude-"
        f"{VARIABLES[variable]['projections_version']}-"
        "anomalies_quantiles.nc"
    )
    with fsspec.open(
        f"filecache::{projections_data_url}", filecache={"same_names": True}
    ) as f:
        projections_data = xr.open_dataarray(f.name)
    projections_sel = select_region(projections_data, selected_layer, region)
    if month_or_season is not None:
        projections_sel = projections_sel.sel(
            time=projections_sel["time.month"] == month_or_season
        )
    variable_name = VARIABLES[variable]["name"].title()
    units = VARIABLES[variable]["units"]
    fig = plots.anomaly_evolution(
        projections_sel,
        temporal_aggregation=temporal_aggregation,
        ylabel=f"Anomaly ({units})",
        units=units,
    )
    fig_json = fig.to_json()
    plot_title = PLOTS["anomaly_evolution"]["title"].format(
        temporal_aggregation=temporal_aggregation,
        variable_name=variable_name,
        region=region_name,
    )
    plot_description = PLOTS["anomaly_evolution"]["description"].format(
        temporal_aggregation=temporal_aggregation, variable_name=variable_name
    )
    return Plot(
        title=plot_title,
        description=plot_description,
        figure=fig_json,
    )


@app.get("/plots/{variable}/climatology")
def climatology(
    variable: str,
    region: str = fastapi.Query(...),
    region_name: str = fastapi.Query(..., alias="regionName"),
    selected_layer: str = fastapi.Query(..., alias="selectedLayer"),
) -> Plot:
    historical_data_url = (
        f"{DATA_HOST}/{variable}/plots/{variable}-historical-"
        f"monthly-layer-{selected_layer}-latitude-"
        f"{VARIABLES[variable]['historical_period']}-"
        f"{VARIABLES[variable]['historical_version']}-"
        "climatology.nc"
    )
    projections_data_url = (
        f"{DATA_HOST}/{variable}/plots/{variable}-projections-"
        f"monthly-layer-{selected_layer}-latitude-"
        f"{VARIABLES[variable]['projections_version']}-"
        "climatology.nc"
    )
    with fsspec.open(
        f"filecache::{historical_data_url}", filecache={"same_names": True}
    ) as f:
        historical_data = xr.open_dataarray(f.name)
    with fsspec.open(
        f"filecache::{projections_data_url}", filecache={"same_names": True}
    ) as f:
        projections_data = xr.open_dataarray(f.name)
    historical_sel = select_region(historical_data, selected_layer, region)
    projections_sel = select_region(projections_data, selected_layer, region)
    variable_name = VARIABLES[variable]["name"].title()
    units = VARIABLES[variable]["units"]
    fig = plots.climatology(
        historical_sel,
        projections_sel,
        ylabel=f"{variable_name} ({units})",
        units=units,
    )
    fig_json = fig.to_json()
    return Plot(
        title=PLOTS["climatology"]["title"].format(
            variable_name=variable_name, region=region_name
        ),
        description=PLOTS["climatology"]["description"],
        figure=fig_json,
    )


origins = [
    "*",
]
app.add_middleware(
    fastapi.middleware.cors.CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
