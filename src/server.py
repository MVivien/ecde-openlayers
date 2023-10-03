import geopandas as gpd
import xarray as xr
import os

import fastapi
import fastapi.middleware.cors
import fsspec

import plotly.express as px
import plotly.io as io

app = fastapi.FastAPI()
DIR = os.path.join(os.path.dirname(__file__))


@app.get("/geojson/{layer}")
def generate_geojson(
    layer: str,
    rcp: str = fastapi.Query("rcp26"),
    horizon: str = fastapi.Query("1981-01-01"),
    temporal_aggregation: str = fastapi.Query("annual", alias="temporalAggregation"),
) -> fastapi.responses.StreamingResponse:
    if horizon == "1981-01-01":
      url = f"https://ecde-data.copernicus-climate.eu/05_tropical_nights/plots/05_tropical_nights-historical" \
            f"-{temporal_aggregation}-layer-{layer}-latitude-1959-2022-v0.2-30yrs_average.nc"
    else:
      url = f"https://ecde-data.copernicus-climate.eu/05_tropical_nights/plots/05_tropical_nights-projections" \
            f"-{temporal_aggregation}-layer-{layer}-latitude-v0.3-30yrs_average.nc"

    with fsspec.open(f"filecache::{url}", filecache={"same_names": True}) as f:
        data = xr.open_dataarray(f.name)

    if "avg_period" in data.dims:
        data = data.sel(scenario=rcp, avg_period=horizon)

    df = data.to_dataframe().reset_index()
    df = df.rename(columns={"nuts": "NUTS_ID", data.name: "value"})

    level = {
        'nuts_0': 'LEVL_0',
        'nuts_1': 'LEVL_1',
        'nuts_2': 'LEVL_2',
    }[layer]
    geodataframe = gpd.read_file(os.path.join(DIR, f'../public/NUTS_RG_60M_2021_4326_{level}.geojson'))
    gdf = geodataframe.merge(df, on='NUTS_ID')
    gdf = gdf.to_crs('epsg:3035')
    gdf.to_file(os.path.join(DIR, "../public/reduced_data.json"), driver="GeoJSON")

    return fastapi.responses.FileResponse(os.path.join(DIR, "../public/reduced_data.json"))


@app.get("/plot1")
def plot1(
    rcp: str = fastapi.Query("rcp26"),
    region: str = fastapi.Query("AT"),
    selected_layer: str = fastapi.Query("0"),
    temporal_aggregation: str = fastapi.Query("annual", alias="temporalAggregation"),
):
    url = f"https://ecde-data.copernicus-climate.eu/05_tropical_nights/plots/05_tropical_nights-projections" \
          f"-{temporal_aggregation}-layer-nuts_{selected_layer}-latitude-v0.3-quantiles.nc"

    with fsspec.open(f"filecache::{url}", filecache={"same_names": True}) as f:
        data = xr.open_dataarray(f.name)
    print(data)
    sel = data.sel(nuts=region, scenario=rcp, quantile=0.5)
    fig = px.line(sel.data)

    io.write_json(fig, os.path.join(DIR, f"../public/plot1_{rcp}_{selected_layer}.json"))

    return fastapi.responses.FileResponse(os.path.join(DIR, f"../public/plot1_{rcp}_{selected_layer}.json"))


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