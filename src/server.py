import geopandas as gpd
import xarray as xr
import os

from flask import Flask, request, send_file, Response, jsonify
from flask_cors import CORS
import fsspec

import plotly.express as px
import plotly.io as io

app = Flask(__name__)
CORS(app)


@app.route("/geojson/<path:layer>")
def generate_geojson(layer):
    rcp = request.args.get("rcp", type=str)
    horizon = request.args.get("horizon", type=str)

    if horizon == "1981-01-01":
      url = f"https://ecde-data.copernicus-climate.eu/05_tropical_nights/plots/05_tropical_nights-historical-yearly-layer-{layer}-latitude-1959-2022-v0.2-30yrs_average.nc"
    else:
      url = f"https://ecde-data.copernicus-climate.eu/05_tropical_nights/plots/05_tropical_nights-projections-yearly-layer-{layer}-latitude-v0.3-30yrs_average.nc"

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
    geodataframe = gpd.read_file(
        os.path.join(
            os.path.dirname(__file__),
            f'../public/NUTS_RG_60M_2021_4326_{level}.geojson'
        )
    )
    gdf = geodataframe.merge(df, on='NUTS_ID')
    gdf = gdf.to_crs('epsg:3035')
    gdf.to_file("../public/reduced_data.json", driver="GeoJSON")

    return send_file("../public/reduced_data.json", mimetype="application/json")


@app.route("/plot1")
def plot1():
    rcp = request.args.get("rcp", type=str)
    region = request.args.get("region", type=str)

    filename = os.path.join(
            os.path.dirname(__file__),
            f"../public/01_mean_temperature_projections-seasonal-{rcp}-rca4-ec_earth-r12i1p1-layer-nuts_0-latitude-v0.2.nc"
        )
    data = xr.open_dataarray(filename)
    sel = data.sel(nuts=region) - 273.15
    fig = px.line(sel.data)

    io.write_json(fig, f"../public/plot1_{rcp}.json")

    return send_file(f"../public/plot1_{rcp}.json", mimetype="application/json")


if __name__ == "__main__":
    app.run(debug=True)
