import plotly.graph_objects as go
import xarray as xr

def historical_anomalies(data: xr.DataArray):
    df = data.to_pandas()
    fig = go.Figure()
    fig = fig.add_trace(
        go.Bar(x=df.index, y=df.values, name=data.name)
    )
    return fig