import { Suspense, lazy, useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import MapApplication from './components/MapApplication';
import SubApp from './SubApp';
import ChildApp from './ChildApp.jsx';
import Loading from './Loading.jsx';
import OtherControls from './OtherControls.jsx';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ToggleButton from '@mui/material/ToggleButton';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { ToggleButtonGroup } from '@mui/material';

import { EVENT_GROUP_SET_LAYERS } from './constants';
import { registerEvent } from './map_events';

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
  const [horizon, setHorizon] = useState('2011-01-01');
  const [region, setRegion] = useState('');
  const [selectedLayer, setSelectedLayer] = useState('');
  const [temporalAggregation, setTemporalAggregation] = useState('yearly');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [openPlotDrawer, setOpenPlotDrawer] = useState(false);

  const handleMapClick = (lat, lon, region, selectedLayer) => {
    console.log(`Map clicked at ${lat}, ${lon}, ${region}, ${selectedLayer}`);
    setLat(lat);
    setLon(lon);
    setRegion(region);
    setSelectedLayer(selectedLayer);
    setChildApp(true);
    setOpenPlotDrawer(true);
    setTimeout(() => {
      setOpenPlotDrawer(null);
    });
  };

  const handleClose = () => {
    setChildApp(false);
  };

  const handleRcpChange = (event) => {
    setRcp(event.target.value);
  };

  const handleHorizonChange = (event) => {
    setHorizon(event.target.value);
  };

  const handleTemporalAggregation = (event) => {
    setTemporalAggregation(event.target.value);
  };

  useEffect(() => {
    if (rcp) {
      console.log('controler');
      // const { name, url } = NUTS.find((item) => item.name === nut);
      const event = new CustomEvent(EVENT_GROUP_SET_LAYERS, {
        detail: {
          group: 'NUTS Regions',
          layers: [
            {
              name: `NUTS 2`,
              type: 'vector',
              sourceType: 'vector',
              params: `NUTS 2`,
              sourceParams: {
                url: `http://localhost:5000/geojson/nuts_2?rcp=${rcp}&horizon=${horizon}&temporalAggregation=${temporalAggregation}`,
              },
            },
            {
              name: `NUTS 1`,
              type: 'vector',
              sourceType: 'vector',
              params: `NUTS 1`,
              sourceParams: {
                url: `http://localhost:5000/geojson/nuts_1?rcp=${rcp}&horizon=${horizon}&temporalAggregation=${temporalAggregation}`,
              },
            },
            {
              name: `NUTS 0`,
              type: 'vector',
              sourceType: 'vector',
              params: `NUTS 0`,
              sourceParams: {
                url: `http://localhost:5000/geojson/nuts_0?rcp=${rcp}&horizon=${horizon}&temporalAggregation=${temporalAggregation}`,
              },
            },
          ],
        },
      });
      registerEvent(event);
    }
  }, [rcp, horizon, temporalAggregation]);

  const cities = [
    { label: 'Bologna', year: 1994 },
    { label: 'Ferrara', year: 1972 },
    { label: 'Reading', year: 1974 },
    { label: 'Bonn', year: 2008 },
    { label: 'Milan', year: 1957 },
    { label: 'Rome', year: 1993 },
    { label: 'London', year: 1994 },
    {
      label: 'Madrid',
      year: 2003,
    },
    { label: 'Amsterdam', year: 1966 },
  ];

  const inputs = (
    <>
      <Typography variant="subtitle1" paragraph component="label" align="left">
        Regions
      </Typography>
      <ToggleButtonGroup variant="outlined" aria-label="outlined button group">
        <ToggleButton value="nuts">NUTS</ToggleButton>
        <ToggleButton value="transnational">Transnational regions</ToggleButton>
        <ToggleButton value="europe">Europe Zones</ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="subtitle1" paragraph component="label" align="left">
        Time span
      </Typography>
      <ToggleButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        value={temporalAggregation}
        onChange={handleTemporalAggregation}
      >
        <ToggleButton value="yearly">Year</ToggleButton>
        <ToggleButton value="seasonal">Season</ToggleButton>
        <ToggleButton value="monthly">Month</ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="subtitle1" paragraph component="label" align="left">
        Scenario
      </Typography>
      <ToggleButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        id="control-1"
        value={rcp}
        label="RCP scenario"
        onChange={handleRcpChange}
      >
        <ToggleButton value="rcp_4_5">RCP4.5</ToggleButton>
        <ToggleButton value="rcp_8_5">RCP8.5</ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="subtitle1" paragraph component="label" align="left">
        Time Horizon
      </Typography>
      <ToggleButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        id="time-hprizon"
        value={horizon}
        label="Time Horizon"
        onChange={handleHorizonChange}
      >
        <ToggleButton value="1981-01-01">1981-2010</ToggleButton>
        <ToggleButton value="2011-01-01">2011-2040</ToggleButton>
        <ToggleButton value="2041-01-01">2041-2070</ToggleButton>
        <ToggleButton value="2071-01-01">2071-2100</ToggleButton>
      </ToggleButtonGroup>
    </>
  );

  const outputs = childApp ? (
    <ChildApp
      onClose={handleClose}
      lat={lat}
      lon={lon}
      region={region}
      selectedLayer={selectedLayer}
      temporalAggregation={temporalAggregation}
      rcp={rcp}
    />
  ) : null;

  return (
    <>
      <CssBaseline />
      <Grid>
        <Suspense fallback={<Loading />}>
          <MapApplication
            inputs={inputs}
            outputs={outputs}
            inputsMd="left"
            inputsXs="top"
            outputsMd="right"
            outputsXs="bottom"
            openPlotDrawer={openPlotDrawer}
            drawerDefaultLeft={true}
            drawerDefaultTop={true}
          >
            <Map onClick={handleMapClick} />
          </MapApplication>
        </Suspense>
      </Grid>
    </>
  );
}

export default App;
