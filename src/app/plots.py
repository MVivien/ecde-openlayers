import plotly.graph_objects as go
import xarray as xr

COLORS = {
    "dark_grey": "rgb(169, 169, 169)",
    "light_grey": "rgb(182, 182, 182)",
    "lighter_grey": "rgb(236, 236, 236)",
    "red": "rgb(0.77, 0.23, 0.23)",
    "blue": "rgb(0.19, 0.49, 0.72)",
    "green": "rgba(113, 211, 197, 1)",
    "green_shade": "rgba(206,241,137,0.3)",
    "orange": "rgba(249,191,124,1)",
    "orange_shade": "rgba(249,191,124,0.3)"
}
LAYOUT = go.Layout(
    paper_bgcolor="rgb(255,255,255)",
    plot_bgcolor="rgb(255,255,255)",
    xaxis=go.layout.XAxis(
        title={"text": ""},
        color=COLORS["light_grey"],
        gridcolor=COLORS["lighter_grey"],
    ),
    yaxis=go.layout.YAxis(
        color=COLORS["light_grey"],
        gridcolor=COLORS["lighter_grey"],
        side="right",
    ),
    height=300,
    margin={"l": 25, "r": 55, "b": 30, "t": 30},
    hovermode="x",
)


def historical_anomalies(
    data: xr.DataArray,
    units: str = "",
) -> go.Figure:
    fig = go.Figure(layout=LAYOUT)
    bar_color = [
        COLORS["red"] if value >= 0 else COLORS["blue"] for value in data.values
    ]
    fig = fig.add_trace(
        go.Bar(
            x=data.time,
            y=data.values,
            name=data.name,
            marker={"color": bar_color},
            hovertemplate=f"%{{x}}, %{{y:.1f}} {units}<extra></extra>",  # noqa: F541
        )
    )
    fig.update_layout(yaxis_title=f"Anomaly ({units})")
    print(type(fig))
    return fig


def actual_evolution(
    historical_data: xr.DataArray,
    projections_data: xr.DataArray,
    units: str = "",
) -> go.Figure:
    hovertemplate = "%{x}, %{y:" ".1f}" f" {units}"
    fig = go.Figure(layout=LAYOUT)
    fig = fig.add_trace(
        go.Scatter(
            x=historical_data.time,
            y=historical_data.values,
            name="ERA5",
            visible=True,
            mode="lines",
            line={"color": COLORS["dark_grey"]},
        )
    )
    fig = fig.add_trace(
        go.Scatter(
            x=projections_data.time,
            y=projections_data.sel(scenario="rcp_4_5", quantile=0.5).values,
            name="RCP 4.5 median",
            visible=True,
            mode="lines",
            line={"color": COLORS["green"], "shape": "spline", "smoothing": 1.3},
            hovertemplate=hovertemplate,    
        )
    )
    return fig
