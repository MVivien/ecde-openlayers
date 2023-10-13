import Plotly from 'plotly.js-dist-min';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { API_BASE } from './config';

function Chart({ id, plot_name, region, selectedLayer, temporalAggregation, month, season }) {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    async function loadPlot() {
      let tempAggregationVar =
        temporalAggregation === 'monthly'
          ? `&month=${month}`
          : temporalAggregation === 'seasonal'
          ? `&season=${season}`
          : '';
      const plot = await fetch(
        `${API_BASE}/plots/05_tropical_nights/${plot_name}?region=${region}&selectedLayer=${selectedLayer}&temporalAggregation=${temporalAggregation}${tempAggregationVar}`,
      );
      const json = await plot.json();
      setPlotData(json);
    }
    loadPlot();
  }, [region, plot_name, selectedLayer, temporalAggregation, month, season]);

  useEffect(() => {
    if (!plotData) {
      return;
    }
    Plotly.newPlot(id, plotData.data, plotData.layout);
  }, [id, region, plotData]);

  return <section className="plotly-chart" id={id} />;
}

Chart.propTypes = {
  id: PropTypes.string,
  plot_name: PropTypes.string,
  region: PropTypes.string,
  selectedLayer: PropTypes.number || PropTypes.string,
  temporalAggregation: PropTypes.string,
  month: PropTypes.number,
  season: PropTypes.number,
};

export default Chart;
