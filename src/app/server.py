import geopandas as gpd
import xarray as xr
import os

import fastapi
import fastapi.middleware.cors
import fsspec
import plotly.io as io
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

REGIONAL_AGGREGATIONS = {
    "nuts": {
        "group_name": "NUTS Regions",
        "layers": {
            "nuts_0": "NUTS 0",
            "nuts_1": "NUTS 1",
            "nuts_2": "NUTS 2",
        },
    }
}


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


@app.get("/regions/{variable}")
def get_layers_group(
    variable: str,
    regional_aggregation: str = fastapi.Query(..., alias="regionalAggregation"),
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
                    "url": f"/geojson/{variable}/{layer_id}?rcp={rcp}&horizon={horizon}&temporalAggregation={temporal_aggregation}{temporal_aggregation_var}",
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
    rcp: str = fastapi.Query(...),
    horizon: str = fastapi.Query(...),
    temporal_aggregation: str = fastapi.Query(..., alias="temporalAggregation"),
    month_or_season: int | None = fastapi.Depends(month_or_season),
) -> fastapi.responses.StreamingResponse:
    if horizon == "1981-01-01":
        url = (
            f"{DATA_HOST}/{variable}/plots/{variable}-historical-"
            f"{temporal_aggregation}-layer-{layer}-latitude-"
            f"{VARIABLES[variable]['historical_period']}-"
            f"{VARIABLES[variable]['historical_version']}-"
            "30yrs_average.nc"
        )
    else:
        url = (
            f"{DATA_HOST}/{variable}/plots/{variable}-projections-"
            f"{temporal_aggregation}-layer-{layer}-latitude-"
            f"{VARIABLES[variable]['projections_version']}-"
            "30yrs_average.nc"
        )
    with fsspec.open(f"filecache::{url}", filecache={"same_names": True}) as f:
        data = xr.open_dataarray(f.name)
    if "avg_period" in data.dims:
        data = data.sel(scenario=rcp, avg_period=horizon)
    if month_or_season is not None:
        data = data.sel(month=month_or_season)
    df = data.to_dataframe().reset_index()
    df = df.rename(columns={"nuts": "NUTS_ID", data.name: "value"})
    level = {
        "nuts_0": "LEVL_0",
        "nuts_1": "LEVL_1",
        "nuts_2": "LEVL_2",
    }[layer]
    geodataframe = gpd.read_file(
        os.path.join(DIR, f"../../public/NUTS_RG_60M_2021_4326_{level}.geojson")
    )
    gdf = geodataframe.merge(df, on="NUTS_ID")
    gdf = gdf.to_crs("epsg:3035")
    gdf_json_path = os.path.join(DIR, f"../../public/{variable}-reduced_data.json")
    gdf.to_file(gdf_json_path, driver="GeoJSON")
    return fastapi.responses.FileResponse(gdf_json_path)


@app.get("/plots/{variable}/historical_anomalies")
def historical_anomalies(
    variable: str,
    region: str = fastapi.Query(...),
    selected_layer: str = fastapi.Query(..., alias="selectedLayer"),
    temporal_aggregation: str = fastapi.Query(..., alias="temporalAggregation"),
    month_or_season: int | None = fastapi.Depends(month_or_season),
):
    data_url = (
        f"{DATA_HOST}/{variable}/plots/{variable}-historical-"
        f"{temporal_aggregation}-layer-nuts_{selected_layer}-latitude-"
        f"{VARIABLES[variable]['historical_period']}-"
        f"{VARIABLES[variable]['historical_version']}-"
        "anomalies.nc"
    )
    with fsspec.open(f"filecache::{data_url}", filecache={"same_names": True}) as f:
        data = xr.open_dataarray(f.name)
    sel = data.sel(nuts=region)
    if month_or_season is not None:
        sel = sel.sel(time=sel["time.month"] == month_or_season)
    fig = plots.historical_anomalies(
        sel,
        temporal_aggregation=temporal_aggregation,
        ylabel=f"Anomaly ({VARIABLES[variable]['units']})",
        units=VARIABLES[variable]["units"],
    )
    fig_json_path = os.path.join(
        DIR, f"../../public/{variable}-historical_anomalies-{selected_layer}.json"
    )
    io.write_json(fig, fig_json_path)
    return fastapi.responses.FileResponse(fig_json_path)


@app.get("/plots/{variable}/actual_evolution")
def actual_evolution(
    variable: str,
    region: str = fastapi.Query(...),
    selected_layer: str = fastapi.Query(..., alias="selectedLayer"),
    temporal_aggregation: str = fastapi.Query(..., alias="temporalAggregation"),
    month_or_season: int | None = fastapi.Depends(month_or_season),
):
    historical_data_url = (
        f"{DATA_HOST}/{variable}/historical/{variable}-historical-"
        f"{temporal_aggregation}-layer-nuts_{selected_layer}-latitude-"
        f"{VARIABLES[variable]['historical_period']}-"
        f"{VARIABLES[variable]['historical_version']}.nc"
    )
    projections_data_url = (
        f"{DATA_HOST}/{variable}/plots/{variable}-projections-"
        f"{temporal_aggregation}-layer-nuts_{selected_layer}-latitude-"
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
    historical_sel = historical_data.sel(nuts=region)
    projections_sel = projections_data.sel(nuts=region)
    if month_or_season is not None:
        historical_sel = historical_sel.sel(
            time=historical_sel["time.month"] == month_or_season
        )
        projections_sel = projections_sel.sel(
            time=projections_sel["time.month"] == month_or_season
        )
    fig = plots.actual_evolution(
        historical_sel,
        projections_sel,
        temporal_aggregation=temporal_aggregation,
        ylabel=f"{VARIABLES[variable]['name'].capitalize()} ({VARIABLES[variable]['units']})",
        units=VARIABLES[variable]["units"],
    )
    fig_json_path = os.path.join(
        DIR, f"../../public/{variable}-actual_evolution-{selected_layer}.json"
    )
    io.write_json(fig, fig_json_path)
    return fastapi.responses.FileResponse(fig_json_path)


@app.get("/plots/{variable}/anomaly_evolution")
def anomaly_evolution(
    variable: str,
    region: str = fastapi.Query(...),
    selected_layer: str = fastapi.Query(..., alias="selectedLayer"),
    temporal_aggregation: str = fastapi.Query(..., alias="temporalAggregation"),
    month_or_season: int | None = fastapi.Depends(month_or_season),
):
    projections_data_url = (
        f"{DATA_HOST}/{variable}/plots/{variable}-projections-"
        f"{temporal_aggregation}-layer-nuts_{selected_layer}-latitude-"
        f"{VARIABLES[variable]['projections_version']}-"
        "anomalies_quantiles.nc"
    )
    with fsspec.open(
        f"filecache::{projections_data_url}", filecache={"same_names": True}
    ) as f:
        projections_data = xr.open_dataarray(f.name)
    projections_sel = projections_data.sel(nuts=region)
    if month_or_season is not None:
        projections_sel = projections_sel.sel(
            time=projections_sel["time.month"] == month_or_season
        )
    fig = plots.anomaly_evolution(
        projections_sel,
        temporal_aggregation=temporal_aggregation,
        ylabel=f"Anomaly ({VARIABLES[variable]['units']})",
        units=VARIABLES[variable]["units"],
    )
    fig_json_path = os.path.join(
        DIR, f"../../public/{variable}-anomaly_evolution-{selected_layer}.json"
    )
    io.write_json(fig, fig_json_path)
    return fastapi.responses.FileResponse(fig_json_path)


@app.get("/plots/{variable}/climatology")
def climatology(
    variable: str,
    region: str = fastapi.Query(...),
    selected_layer: str = fastapi.Query(..., alias="selectedLayer"),
):
    historical_data_url = (
        f"{DATA_HOST}/{variable}/plots/{variable}-historical-"
        f"monthly-layer-nuts_{selected_layer}-latitude-"
        f"{VARIABLES[variable]['historical_period']}-"
        f"{VARIABLES[variable]['historical_version']}-"
        "climatology.nc"
    )
    projections_data_url = (
        f"{DATA_HOST}/{variable}/plots/{variable}-projections-"
        f"monthly-layer-nuts_{selected_layer}-latitude-"
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
    historical_sel = historical_data.sel(nuts=region)
    projections_sel = projections_data.sel(nuts=region)
    fig = plots.climatology(
        historical_sel,
        projections_sel,
        ylabel=f"{VARIABLES[variable]['name'].capitalize()} ({VARIABLES[variable]['units']})",
        units=VARIABLES[variable]["units"],
    )
    fig_json_path = os.path.join(
        DIR, f"../../public/{variable}-climatology-{selected_layer}.json"
    )
    io.write_json(fig, fig_json_path)
    return fastapi.responses.FileResponse(fig_json_path)


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
