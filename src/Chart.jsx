import Plotly from 'plotly.js-basic-dist-min';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import { API_BASE } from './config';

function Chart({ id, plot_name, region, regionName, selectedLayer, temporalAggregation, month, season }) {
  const [plotData, setPlotData] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    async function loadPlot() {
      let tempAggregationVar =
        temporalAggregation === 'monthly'
          ? `&month=${month}`
          : temporalAggregation === 'seasonal'
          ? `&season=${season}`
          : '';
      const plot = await fetch(
        `${API_BASE}/plots/05_tropical_nights/${plot_name}?region=${region}&regionName=${regionName}&selectedLayer=${selectedLayer}&temporalAggregation=${temporalAggregation}${tempAggregationVar}`,
      );
      const json = await plot.json();
      const result = JSON.parse(json?.figure);
      setTitle(json?.title);
      setDescription(json?.description);
      setPlotData(result);
    }
    loadPlot();
  }, [region, regionName, plot_name, selectedLayer, temporalAggregation, month, season]);

  useEffect(() => {
    if (!plotData) {
      return;
    }
    Plotly.newPlot(id, plotData.data, plotData.layout);
  }, [id, region, regionName, plotData]);

  return (
    <div>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="description" style={{ maxWidth: '30%' }}>
        {description}
      </Typography>
      <section className="plotly-chart" id={id} />
    </div>
  );
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
