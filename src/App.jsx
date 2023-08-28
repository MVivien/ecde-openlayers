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

const Map = lazy(() => import('./Map.jsx'));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const [childApp, setChildApp] = useState(false);

  const handleMapClick = (lat, lon) => {
    console.log(`Map clicked at ${lat}, ${lon}`);
    setChildApp(true);
  };

  const handleClose = () => {
    setChildApp(false);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid sm={3}>
            <Item>
              <NutsSelector mapContainerId="map-container" />
              <EcChartsSelector mapContainerId="map-container" />
              {childApp ? <ChildApp onClose={handleClose} /> : null}
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
