import copy

import plotly.graph_objects as go
import xarray as xr

from . import utils

COLORS = {
    "dark_grey": "rgb(169, 169, 169)",
    "light_grey": "rgb(182, 182, 182)",
    "lighter_grey": "rgb(236, 236, 236)",
    "red": "rgb(0.77, 0.23, 0.23)",
    "blue": "rgb(0.19, 0.49, 0.72)",
    "green": "rgba(113, 211, 197, 1)",
    "green_shade": "rgba(206,241,137,0.3)",
    "orange": "rgba(249,191,124,1)",
    "orange_shade": "rgba(249,191,124,0.3)",
}
MONTHS_SHORT = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]
LAYOUT = {
    "paper_bgcolor": "rgb(255,255,255)",
    "plot_bgcolor": "rgb(255,255,255)",
    "xaxis": {
        "title": {"text": ""},
        "color": COLORS["light_grey"],
        "gridcolor": COLORS["lighter_grey"],
    },
    "yaxis": {
        "color": COLORS["light_grey"],
        "gridcolor": COLORS["lighter_grey"],
        "side": "right",
    },
    "height": 300,
    "margin": {"l": 25, "r": 55, "b": 30, "t": 30},
    "hovermode": "x",
}
ANNOTATIONS = {
    "xref": "paper",
    "yref": "paper",
    "x": 0,
    "y": 1.1,
    "showarrow": False,
}
TICKFORMAT = {
    "yearly": "%Y",
    "seasonal": "",
    "monthly": "",
}
SCENARIOS = {
    "rcp_4_5": {
        "label": "RCP4.5",
        "linecolor": COLORS["green"],
        "fillcolor": COLORS["green_shade"],
    },
    "rcp_8_5": {
        "label": "RCP8.5",
        "linecolor": COLORS["orange"],
        "fillcolor": COLORS["orange_shade"],
    },
}
SCENARIO_BUTTONS = [
    {
        "type": "buttons",
        "direction": "right",
        "active": 2,
        "x": 0.5,
        "xanchor": "center",
        "y": -0.1,
        "yanchor": "top",
        "buttons": [
            {
                "label": SCENARIOS["rcp_4_5"]["label"],
                "method": "update",
                "args": [{"visible": [True, True, True, False, False, False, True]}],
            },
            {
                "label": SCENARIOS["rcp_8_5"]["label"],
                "method": "update",
                "args": [{"visible": [False, False, False, True, True, True, True]}],
            },
            {
                "label": "All scenarios",
                "method": "update",
                "args": [{"visible": [True, True, True, True, True, True, True]}],
            },
        ],
    },
]
PERIOD_BUTTONS = [
    {
        "type": "buttons",
        "direction": "right",
        "active": 2,
        "x": 0.5,
        "xanchor": "center",
        "y": -0.1,
        "yanchor": "top",
        "buttons": [
            {
                "label": "2011-2040",
                "method": "update",
                "args": [{"visible": [True] + [True] * 6 + [False] * 12}],
            },
            {
                "label": "2041-2070",
                "method": "update",
                "args": [{"visible": [True] + [False] * 6 + [True] * 6 + [False] * 6}],
            },
            {
                "label": "2071-2100",
                "method": "update",
                "args": [{"visible": [True] + [False] * 12 + [True] * 6}],
            },
        ],
    },
]


def historical_anomalies(
    data: xr.DataArray,
    temporal_aggregation: str = "yearly",
    ylabel: str = "",
    title: str = "",
    units: str = "",
) -> go.Figure:
    common_layout = copy.deepcopy(LAYOUT)
    local_layout = {
        "yaxis": {"title": {"text": ylabel}},
        "bargap": 0.5,
        "xaxis_tickformat": TICKFORMAT[temporal_aggregation],
    }
    local_layout["annotations"] = [
        utils.recursive_update(copy.deepcopy(ANNOTATIONS), {"text": title})
    ]
    plot_layout = utils.recursive_update(common_layout, local_layout)
    fig = go.Figure(layout=plot_layout)
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
    return fig


def actual_evolution(
    historical_data: xr.DataArray,
    projections_data: xr.DataArray,
    temporal_aggregation: str = "yearly",
    ylabel: str = "",
    title: str = "",
    units: str = "",
) -> go.Figure:
    max_val = (
        max(
            [
                data.max()
                for data in [
                    projections_data.sel(scenario="rcp_4_5", quantile=0.83),
                    projections_data.sel(scenario="rcp_8_5", quantile=0.83),
                    historical_data,
                ]
            ]
        )
    ) * 1.02
    min_val = (
        min(
            [
                data.min()
                for data in [
                    projections_data.sel(scenario="rcp_4_5", quantile=0.17),
                    projections_data.sel(scenario="rcp_8_5", quantile=0.17),
                    historical_data,
                ]
            ]
        )
    ) * 0.98
    common_layout = copy.deepcopy(LAYOUT)
    local_layout = {
        "legend": {"orientation": "h"},
        "updatemenus": SCENARIO_BUTTONS,
        "showlegend": False,
        "yaxis": {"title": {"text": ylabel}, "range": [min_val, max_val]},
        "xaxis_tickformat": TICKFORMAT[temporal_aggregation],
    }
    local_layout["annotations"] = [
        utils.recursive_update(
            copy.deepcopy(ANNOTATIONS), {"text": title, "showarrow": False}
        )
    ]
    plot_layout = utils.recursive_update(common_layout, local_layout)
    hovertemplate = f"%{{x}}, %{{y:.1f}} {units}<extra></extra>"
    fig = go.Figure(layout=plot_layout)
    scenarios = projections_data.scenario.values
    for scenario in scenarios:
        scenario_data = projections_data.sel(scenario=scenario)
        fig = fig.add_trace(
            go.Scatter(
                x=scenario_data.time,
                y=scenario_data.sel(quantile=0.17).values,
                name=f"{SCENARIOS[scenario]['label']} 17th percentile",
                visible=True,
                legendgroup=SCENARIOS[scenario]["label"],
                mode="lines",
                line={
                    "color": SCENARIOS[scenario]["linecolor"],
                    "width": 0,
                },
                hovertemplate=hovertemplate,
            )
        )
        fig = fig.add_trace(
            go.Scatter(
                x=scenario_data.time,
                y=scenario_data.sel(quantile=0.83).values,
                name=f"{SCENARIOS[scenario]['label']} 83rd percentile",
                visible=True,
                legendgroup=SCENARIOS[scenario]["label"],
                mode="lines",
                line={
                    "color": SCENARIOS[scenario]["linecolor"],
                    "width": 0,
                },
                fill="tonexty",
                fillcolor=SCENARIOS[scenario]["fillcolor"],
                hovertemplate=hovertemplate,
            )
        )
        fig = fig.add_trace(
            go.Scatter(
                x=projections_data.time,
                y=projections_data.sel(scenario=scenario, quantile=0.5).values,
                name=f"{SCENARIOS[scenario]['label']} median",
                visible=True,
                mode="lines",
                line={
                    "color": SCENARIOS[scenario]["linecolor"],
                    "shape": "spline",
                    "smoothing": 1.3,
                },
                hovertemplate=hovertemplate,
            )
        )
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
    return fig


def anomaly_evolution(
    projections_data: xr.DataArray,
    temporal_aggregation: str = "yearly",
    ylabel: str = "",
    title: str = "",
    units: str = "",
) -> go.Figure:
    max_val = (
        max(
            [
                data.max()
                for data in [
                    projections_data.sel(scenario="rcp_4_5", quantile=0.83),
                    projections_data.sel(scenario="rcp_8_5", quantile=0.83),
                ]
            ]
        )
    ) * 1.02
    min_val = (
        min(
            [
                data.min()
                for data in [
                    projections_data.sel(scenario="rcp_4_5", quantile=0.17),
                    projections_data.sel(scenario="rcp_8_5", quantile=0.17),
                ]
            ]
        )
    ) * 0.98
    common_layout = copy.deepcopy(LAYOUT)
    local_layout = {
        "legend": {"orientation": "h"},
        "updatemenus": SCENARIO_BUTTONS,
        "showlegend": False,
        "yaxis": {"title": {"text": ylabel}, "range": [min_val, max_val]},
        "xaxis_tickformat": TICKFORMAT[temporal_aggregation],
    }
    local_layout["annotations"] = [
        utils.recursive_update(
            copy.deepcopy(ANNOTATIONS), {"text": title, "showarrow": False}
        )
    ]
    plot_layout = utils.recursive_update(common_layout, local_layout)
    hovertemplate = f"%{{x}}, %{{y:.1f}} {units}<extra></extra>"
    fig = go.Figure(layout=plot_layout)
    scenarios = projections_data.scenario.values
    for scenario in scenarios:
        scenario_data = projections_data.sel(scenario=scenario)
        fig = fig.add_trace(
            go.Scatter(
                x=scenario_data.time,
                y=scenario_data.sel(quantile=0.17).values,
                name=f"{SCENARIOS[scenario]['label']} 17th percentile",
                visible=True,
                legendgroup=SCENARIOS[scenario]["label"],
                mode="lines",
                line={
                    "color": SCENARIOS[scenario]["linecolor"],
                    "width": 0,
                },
                hovertemplate=hovertemplate,
            )
        )
        fig = fig.add_trace(
            go.Scatter(
                x=scenario_data.time,
                y=scenario_data.sel(quantile=0.83).values,
                name=f"{SCENARIOS[scenario]['label']} 83rd percentile",
                visible=True,
                legendgroup=SCENARIOS[scenario]["label"],
                mode="lines",
                line={
                    "color": SCENARIOS[scenario]["linecolor"],
                    "width": 0,
                },
                fill="tonexty",
                fillcolor=SCENARIOS[scenario]["fillcolor"],
                hovertemplate=hovertemplate,
            )
        )
        fig = fig.add_trace(
            go.Scatter(
                x=projections_data.time,
                y=projections_data.sel(scenario=scenario, quantile=0.5).values,
                name=f"{SCENARIOS[scenario]['label']} median",
                visible=True,
                mode="lines",
                line={
                    "color": SCENARIOS[scenario]["linecolor"],
                    "shape": "spline",
                    "smoothing": 1.3,
                },
                hovertemplate=hovertemplate,
            )
        )
    return fig


def climatology(
    historical_data: xr.DataArray,
    projections_data: xr.DataArray,
    ylabel: str = "",
    title: str = "",
    units: str = "",
) -> go.Figure:
    max_val = (
        max(
            data.max()
            for data in [
                historical_data.sel(stat="mean") + historical_data.sel(stat="std"),
                projections_data.sel(stat="mean", quantile=0.5)
                + projections_data.sel(stat="std", quantile=0.5),
            ]
        )
    ) * 1.02
    min_val = (
        min(
            data.min()
            for data in [
                historical_data.sel(stat="mean") - historical_data.sel(stat="std"),
                projections_data.sel(stat="mean", quantile=0.5)
                - projections_data.sel(stat="std", quantile=0.5),
            ]
        )
    ) * 0.98
    common_layout = copy.deepcopy(LAYOUT)
    local_layout = {
        "legend": {"orientation": "h"},
        "updatemenus": PERIOD_BUTTONS,
        "showlegend": False,
        "yaxis": {"title": {"text": ylabel}, "range": [min_val, max_val]},
        "xaxis": {
            "tickvals": list(range(1, 13)),
            "ticktext": MONTHS_SHORT,
            "tickwidth": 0.1,
        },
    }
    local_layout["annotations"] = [
        utils.recursive_update(
            copy.deepcopy(ANNOTATIONS), {"text": title, "showarrow": False}
        )
    ]
    plot_layout = utils.recursive_update(common_layout, local_layout)
    hovertemplate = f"%{{x}}, %{{y:.1f}} {units}<extra></extra>"
    fig = go.Figure(layout=plot_layout)
    fig = fig.add_trace(
        go.Scatter(
            x=historical_data.month,
            y=historical_data.sel(stat="mean").values,
            error_y={
                "type": "data",
                "array": historical_data.sel(stat="std").values,
                "visible": True,
                "color": COLORS["dark_grey"],
            },
            name="ERA5 climatological average (1981 - 2010)",
            mode="lines",
            line={"color": COLORS["dark_grey"], "shape": "spline", "smoothing": 1.3},
            hovertemplate=hovertemplate,
            visible=True,
        )
    )
    visible = False
    periods = projections_data.clim_period.values
    scenarios = projections_data.scenario.values
    for i, period in enumerate(periods):
        if i == 2:
            visible = True
        for scenario in scenarios:
            scenario_data = projections_data.sel(clim_period=period, scenario=scenario)
            fig = fig.add_trace(
                go.Scatter(
                    x=scenario_data.month,
                    y=scenario_data.sel(stat="mean", quantile=0.17).values,
                    legendgroup="historical_data",
                    name=f"{SCENARIOS[scenario]['label']} climatological average 17th percentile",
                    visible=visible,
                    mode="lines",
                    line={
                        "color": SCENARIOS[scenario]["linecolor"],
                        "shape": "spline",
                        "width": 0,
                    },
                    hovertemplate=hovertemplate,
                )
            )
            fig = fig.add_trace(
                go.Scatter(
                    x=scenario_data.month,
                    y=scenario_data.sel(stat="mean", quantile=0.83).values,
                    legendgroup="historical_data",
                    name=f"{SCENARIOS[scenario]['label']} climatological average 83rd percentile",
                    visible=visible,
                    mode="lines",
                    line={
                        "color": SCENARIOS[scenario]["linecolor"],
                        "shape": "spline",
                        "width": 0,
                    },
                    fill="tonexty",
                    fillcolor=SCENARIOS[scenario]["fillcolor"],
                    hovertemplate=hovertemplate,
                )
            )
            fig = fig.add_trace(
                go.Scatter(
                    x=scenario_data.month,
                    y=scenario_data.sel(stat="mean", quantile=0.5).values,
                    error_y={
                        "type": "data",
                        "array": scenario_data.sel(stat="std", quantile=0.5).values,
                        "visible": True,
                        "color": SCENARIOS[scenario]["linecolor"],
                    },
                    legendgroup="historical_data",
                    name=f"{SCENARIOS[scenario]['label']} climatological average median",
                    visible=visible,
                    mode="lines",
                    line={
                        "color": SCENARIOS[scenario]["linecolor"],
                        "shape": "spline",
                        "smoothing": 1.3,
                    },
                    hovertemplate=hovertemplate,
                )
            )
    return fig
