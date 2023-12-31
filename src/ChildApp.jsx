import PropTypes from 'prop-types';
import { Suspense, lazy } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Loading from './Loading.jsx';

const Chart = lazy(() => import('./Chart.jsx'));

function ChildApp({
  onClose,
  lat,
  lon,
  region,
  regionName,
  selectedLayer,
  temporalAggregation,
  month,
  season,
}) {
  return (
    <Box className="child-app">
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 500,
        }}
      >
        {regionName}
        <IconButton aria-label="delete" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Typography>
      <Suspense fallback={<Loading />}>
        <Chart
          id="historical_anomalies"
          plot_name="historical_anomalies"
          region={region}
          regionName={regionName}
          selectedLayer={selectedLayer}
          temporalAggregation={temporalAggregation}
          month={month}
          season={season}
        />
        <Chart
          id="actual_evolution"
          plot_name="actual_evolution"
          region={region}
          regionName={regionName}
          selectedLayer={selectedLayer}
          temporalAggregation={temporalAggregation}
          month={month}
          season={season}
        />
        <Chart
          id="anomaly_evolution"
          plot_name="anomaly_evolution"
          region={region}
          regionName={regionName}
          selectedLayer={selectedLayer}
          temporalAggregation={temporalAggregation}
          month={month}
          season={season}
        />
        <Chart
          id="climatology"
          plot_name="climatology"
          region={region}
          regionName={regionName}
          selectedLayer={selectedLayer}
        />
      </Suspense>
    </Box>
  );
}

ChildApp.propTypes = {
  onClose: PropTypes.func,
  lat: PropTypes.string,
  lon: PropTypes.string,
  region: PropTypes.string,
  selectedLayer: PropTypes.number || PropTypes.string,
  temporalAggregation: PropTypes.string,
  month: PropTypes.number,
  season: PropTypes.number,
};

export default ChildApp;
