import plotly.graph_objects as go
import xarray as xr

COLORS = {"light_gray": "rgb(182, 182, 182)", "lighter_gray": "rgb(236, 236, 236)"}
LAYOUT = go.Layout(
    paper_bgcolor="rgb(255,255,255)",
    plot_bgcolor="rgb(255,255,255)",
    xaxis=go.XAxis(
        title={"text": ""},
        color=COLORS["light_gray"],
        gridcolor=COLORS["lighter_gray"],
    ),
    yaxis=go.YAxis(
        color=COLORS["light_gray"],
        gridcolor=COLORS["lighter_gray"],
        side="right",
    ),
    height=300,
    margin={"l": 25, "r": 55, "b": 30, "t": 30},
    hovermode="x",
)


def historical_anomalies(
    data: xr.DataArray,
    positive_color: str = "rgb(0.77,0.23,0.23)",
    negative_color: str = "rgb(0.19,0.49,0.72)",
    units: str = "",
):
    df = data.to_pandas()
    bar_color = [
        positive_color if value >= 0 else negative_color for value in df.values
    ]
    fig = go.Figure(layout=LAYOUT)
    fig = fig.add_trace(
        go.Bar(
            x=df.index,
            y=df.values,
            name=data.name,
            marker={"color": bar_color},
            hovertemplate=f"%{{x}}, %{{y:.1f}} {units}<extra></extra>",  # noqa: F541
        )
    )
    fig.update_layout(yaxis_title=f"Anomaly ({units})")
    return fig
