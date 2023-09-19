import PropTypes from 'prop-types';
import { Suspense, lazy } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Loading from './Loading.jsx';

const Chart = lazy(() => import('./Chart.jsx'));

function ChildApp({ onClose, lat, lon, region, selectedLayer, rcp }) {
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
        Child app at {lat} {lon} {region}
        <IconButton aria-label="delete" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Typography>
      <Suspense fallback={<Loading />}>
        <Chart rcp={rcp} region={region} selectedLayer={selectedLayer}/>
      </Suspense>
    </Box>
  );
}

ChildApp.propTypes = {
  onClose: PropTypes.func,
};

export default ChildApp;
