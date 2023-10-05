import Plotly from 'plotly.js-dist-min';
import { useEffect, useState } from 'react';

function Chart({ id, plot_name, region, selectedLayer, temporalAggregation }) {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    async function loadPlot() {
      const plot = await fetch(
        `http://localhost:5000/plots/${plot_name}?region=${region}&selectedLayer=${selectedLayer}&temporalAggregation=${temporalAggregation}`,
      );
      const json = await plot.json();
      setPlotData(json);
    }
    loadPlot();
  }, [region, plot_name, selectedLayer, temporalAggregation]);

  useEffect(() => {
    if (!plotData) {
      return;
    }
    Plotly.newPlot(id, plotData.data, plotData.layout);
  }, [region, plotData]);

  return <section className="plotly-chart" id={id} />;
}

export default Chart;
