import Plotly from 'plotly.js-dist-min';
import { useEffect, useState } from 'react';

function Chart({ rcp }) {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    async function loadPlot() {
      const plot = await fetch(`http://localhost:5000/plot1?rcp=${rcp}`);
      const json = await plot.json();
      setPlotData(json);
    }
    loadPlot();
  }, [rcp]);

  useEffect(() => {
    if (!plotData) {
      return;
    }
    Plotly.newPlot('plotly', plotData.data, plotData.layout);
  }, [rcp, plotData]);

  return <section className="plotly-chart" id="plotly" />;
}

export default Chart;
