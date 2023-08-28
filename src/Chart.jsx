import Plotly from 'plotly.js-dist-min';
import { useEffect } from 'react';

function Chart() {
  useEffect(() => {
    Plotly.newPlot(
      'plotly',
      [
        {
          x: [1, 2, 3],
          y: [2, 6, 3],
          type: 'scatter',
        },
      ],
      {
        margin: { t: 0 },
      },
    );
  }, []);

  return <section className="plotly-chart" id="plotly" />;
}

export default Chart;
