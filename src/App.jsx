import { Suspense, lazy, useState } from 'react';

import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import NutsSelector from './NutsSelector.jsx';
import EcChartsSelector from './EcChartsSelector.jsx';
import ChildApp from './ChildApp.jsx';
import Loading from './Loading.jsx';
import OtherControls from './OtherControls.jsx';

const Map = lazy(() => import('./Map.jsx'));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AbsoluteGrid = styled(Grid)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 1,
  marginRight: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

function App() {
  const [childApp, setChildApp] = useState(false);
  const [rcp, setRcp] = useState('rcp_4_5');
  const [region, setRegion] = useState('FR');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const handleMapClick = (lat, lon, region) => {
    console.log(`Map clicked at ${lat}, ${lon}, ${region}`);
    setLat(lat);
    setLon(lon);
    setRegion(region);
    setChildApp(true);
  };

  const handleClose = () => {
    setChildApp(false);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{
            position: 'relative',
          }}
        >
          <Grid sm={3}>
            <Item>
              <OtherControls rcp={rcp} setRcp={setRcp} />
              {childApp ? <ChildApp lat={lat} lon={lon} region={region} onClose={handleClose} rcp={rcp} /> : null}
            </Item>
          </Grid>
          <Grid sm={9}>
            <Item
              sx={{
                height: 'calc(100svh - var(--Grid-rowSpacing))',
                display: 'flex',
                alignItems: 'stretch',
              }}
            >
              <Suspense fallback={<Loading />}>
                <Map onClick={handleMapClick} />
              </Suspense>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
