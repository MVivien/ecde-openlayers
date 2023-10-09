import PropTypes from 'prop-types';
import { Suspense, lazy } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Loading from './Loading.jsx';

const Chart = lazy(() => import('./Chart.jsx'));

function ChildApp({ onClose, lat, lon, region, selectedLayer, temporalAggregation }) {
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
        }}
      >
        Plots at {lat} {lon} {region}
        <IconButton aria-label="delete" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Typography>
      <Suspense fallback={<Loading />}>
        <h4 label style={{ marginBottom: '5px', marginTop: '5px' }}>
          Anomalies
        </h4>
        <p style={{ marginBottom: '5px' }}>Plot about anomalies</p>
        <Chart
          id="historical_anomalies"
          plot_name="historical_anomalies"
          region={region}
          selectedLayer={selectedLayer}
          temporalAggregation={temporalAggregation}
        />
        <h4 label style={{ marginBottom: '5px', marginTop: '5px' }}>
          Evolution
        </h4>
        <p style={{ marginBottom: '5px' }}>Plot about evolution</p>
        <Chart
          id="actual_evolution"
          plot_name="actual_evolution"
          region={region}
          selectedLayer={selectedLayer}
          temporalAggregation={temporalAggregation}
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
};

export default ChildApp;
