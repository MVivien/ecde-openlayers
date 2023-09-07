import geopandas as gpd
import xarray as xr
import json
import os

from flask import Flask, request, send_file, Response, jsonify
from flask_cors import CORS

import plotly.express as px
import plotly.io as io

app = Flask(__name__)
CORS(app)

@app.route("/geojson")
def generate_geojson():
    rcp = request.args.get("rcp", type=str)

    filename = os.path.join(
            os.path.dirname(__file__),
            f"../public/01_mean_temperature_projections-seasonal-{rcp}-rca4-ec_earth-r12i1p1-layer-nuts_0-latitude-v0.2.nc"
        )

    data = xr.open_dataarray(filename).mean(dim="time") - 273.15
    df = data.to_dataframe().reset_index()
    df = df.rename(columns={"nuts": "NUTS_ID", data.name: "value"})

    geodataframe = gpd.read_file(
        os.path.join(
            os.path.dirname(__file__),
            '../public/NUTS_RG_60M_2021_4326_LEVL_0.geojson'
        )
    )
    gdf = geodataframe.merge(df, on='NUTS_ID')

    gdf.to_file("../public/reduced_data.json", driver="GeoJSON")

    return send_file("../public/reduced_data.json", mimetype="application/json")


@app.route("/plot1")
def plot1():
    rcp = request.args.get("rcp", type=str)

    filename = os.path.join(
            os.path.dirname(__file__),
            f"../public/01_mean_temperature_projections-seasonal-{rcp}-rca4-ec_earth-r12i1p1-layer-nuts_0-latitude-v0.2.nc"
        )
    data = xr.open_dataarray(filename)
    sel = data.sel(nuts="FR") - 273.15
    fig = px.line(sel.data)

    io.write_json(fig, "../public/plot1.json")

    return send_file("../public/plot1.json", mimetype="application/json")


if __name__ == "__main__":
    app.run(debug=True)
