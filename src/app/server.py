import geopandas as gpd
import xarray as xr
import os

import fastapi
import fastapi.middleware.cors
import fsspec

import plotly.io as io

from . import plots

app = fastapi.FastAPI()
DIR = os.path.join(os.path.dirname(__file__))


@app.get("/geojson/{layer}")
def generate_geojson(
    layer: str,
    rcp: str = fastapi.Query(...),
    horizon: str = fastapi.Query(...),
    temporalAggregation: str = fastapi.Query(...),
) -> fastapi.responses.StreamingResponse:
    print(temporalAggregation)
    if horizon == "1981-01-01":
        url = (
            f"https://ecde-data.copernicus-climate.eu/05_tropical_nights/plots/05_tropical_nights-historical"
            f"-{temporalAggregation}-layer-{layer}-latitude-1959-2022-v0.2-30yrs_average.nc"
        )
    else:
        url = (
            f"https://ecde-data.copernicus-climate.eu/05_tropical_nights/plots/05_tropical_nights-projections"
            f"-{temporalAggregation}-layer-{layer}-latitude-v0.3-30yrs_average.nc"
        )

    with fsspec.open(f"filecache::{url}", filecache={"same_names": True}, https={"ssl": False}) as f:
        data = xr.open_dataarray(f.name)

    if "avg_period" in data.dims:
        data = data.sel(scenario=rcp, avg_period=horizon)

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
    gdf.to_file(os.path.join(DIR, "../../public/reduced_data.json"), driver="GeoJSON")

    return fastapi.responses.FileResponse(
        os.path.join(DIR, "../../public/reduced_data.json")
    )


@app.get("/plots/historical_anomalies")
def historical_anomalies(
    region: str = fastapi.Query(...),
    selected_layer: str = fastapi.Query(..., alias="selectedLayer"),
    temporal_aggregation: str = fastapi.Query(..., alias="temporalAggregation"),
):
    data_url = (
        f"https://ecde-data.copernicus-climate.eu/05_tropical_nights/plots/05_tropical_nights-historical-"
        f"{temporal_aggregation}-layer-nuts_{selected_layer}-latitude-1959-2022-v0.2-anomalies.nc"
    )
    with fsspec.open(f"filecache::{data_url}", filecache={"same_names": True}, https={"ssl": False}) as f:
        data = xr.open_dataarray(f.name)
    sel = data.sel(nuts=region)
    fig = plots.historical_anomalies(sel, units="days")
    fig_json_path = os.path.join(
        DIR, f"../../public/historical_anomalies_{selected_layer}.json"
    )
    io.write_json(fig, fig_json_path)
    return fastapi.responses.FileResponse(fig_json_path)


@app.get("/plots/actual_evolution")
def actual_evolution(
    region: str = fastapi.Query(...),
    selected_layer: str = fastapi.Query(..., alias="selectedLayer"),
    temporal_aggregation: str = fastapi.Query(..., alias="temporalAggregation"),
):
    historical_data_url = (
        f"https://ecde-data.copernicus-climate.eu/05_tropical_nights/historical/05_tropical_nights-historical-"
        f"{temporal_aggregation}-layer-nuts_{selected_layer}-latitude-1959-2022-v0.2.nc"
    )
    projections_data_url = (
        f"https://ecde-data.copernicus-climate.eu/05_tropical_nights/plots/05_tropical_nights-projections-"
        f"{temporal_aggregation}-layer-nuts_{selected_layer}-latitude-v0.3-quantiles.nc"
    )
    with fsspec.open(
        f"filecache::{historical_data_url}", filecache={"same_names": True}, https={"ssl": False}
    ) as f:
        historical_data = xr.open_dataarray(f.name)
    with fsspec.open(
        f"filecache::{projections_data_url}", filecache={"same_names": True}, https={"ssl": False}
    ) as f:
        projections_data = xr.open_dataarray(f.name)
    historical_sel = historical_data.sel(nuts=region)
    projections_sel = projections_data.sel(nuts=region)
    fig = plots.actual_evolution(historical_sel, projections_sel, units="days")
    fig_json_path = os.path.join(
        DIR, f"../../public/actual_evolution_{selected_layer}.json"
    )
    io.write_json(fig, fig_json_path)
    return fastapi.responses.FileResponse(fig_json_path)


origins = [
    "http://localhost:5173",
]
app.add_middleware(
    fastapi.middleware.cors.CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
