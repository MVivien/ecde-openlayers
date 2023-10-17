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
  selectedLayer,
  temporalAggregation,
  month,
  season,
}) {
  return (
    <Box className="child-app" sx={{ marginTop: '3rem' }}>
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
        Plots at {region}
        <IconButton aria-label="delete" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Typography>
      <Suspense fallback={<Loading />}>
        <Typography variant="h4">Historical Anomalies</Typography>
        <Typography variant="p">Plot about historical anomalies</Typography>
        <Chart
          id="historical_anomalies"
          plot_name="historical_anomalies"
          region={region}
          selectedLayer={selectedLayer}
          temporalAggregation={temporalAggregation}
          month={month}
          season={season}
        />
        <Typography variant="h4">Actual Evolution</Typography>
        <Typography variant="p">Plot about actual evolution</Typography>
        <Chart
          id="actual_evolution"
          plot_name="actual_evolution"
          region={region}
          selectedLayer={selectedLayer}
          temporalAggregation={temporalAggregation}
          month={month}
          season={season}
        />
        <Typography variant="h4">Anomaly Evolution</Typography>
        <Typography variant="p">Plot about anomaly evolution</Typography>
        <Chart
          id="anomaly_evolution"
          plot_name="anomaly_evolution"
          region={region}
          selectedLayer={selectedLayer}
          temporalAggregation={temporalAggregation}
          month={month}
          season={season}
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
