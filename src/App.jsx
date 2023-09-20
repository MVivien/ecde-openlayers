import { Suspense, lazy, useState } from 'react';

import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import MapApplication from "./components/MapApplication";
import SubApp from "./SubApp";
import ChildApp from './ChildApp.jsx';
import Loading from './Loading.jsx';
import OtherControls from './OtherControls.jsx';
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ToggleButton from "@mui/material/ToggleButton";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { ToggleButtonGroup } from '@mui/material';

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

  const handleMapClick = (lat, lon, region, selectedLayer) => {
    console.log(`Map clicked at ${lat}, ${lon}, ${region}, ${selectedLayer}`);
    setLat(lat);
    setLon(lon);
    setRegion(region);
    setSelectedLayer(selectedLayer);
    setChildApp(true);
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

const cities = [
  { label: "Bologna", year: 1994 },
  { label: "Ferrara", year: 1972 },
  { label: "Reading", year: 1974 },
  { label: "Bonn", year: 2008 },
  { label: "Milan", year: 1957 },
  { label: "Rome", year: 1993 },
  { label: "London", year: 1994 },
  {
    label: "Madrid",
    year: 2003,
  },
  { label: "Amsterdam", year: 1966 },
];

const inputs = (
  <>
    <Typography component="label" variant="caption">
      Europe Agroglimatic Indicators Explorer
    </Typography>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={cities}
      renderInput={(params) => <TextField {...params} label="City" />}
      fullWidth
    />
    <Typography component="label" variant="caption">
      Variable
    </Typography>
    <Stack spacing={2} justifyContent="center" direction="row">
      <ToggleButton size="small" defaultValue="1">
        Heath stress
      </ToggleButton>
      <ToggleButton size="small" defaultValue="2">
        Thresold
      </ToggleButton>
      <ToggleButton size="small" defaultValue="3">
        Scenario
      </ToggleButton>
    </Stack>
    <Typography component="label" variant="caption">
      Thresold
    </Typography>
    <Slider defaultValue={30} min={1} max={100} aria-label="Thresold" />
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
    <FormControl fullWidth>
      <InputLabel id="demo2-label">Time horizon</InputLabel>
      <Select labelId="demo2-label" id="demo2" defaultValue={horizon} label="Time Horizon" onChange={handleHorizonChange}>
        <MenuItem value={"1981-01-01"}>1981 - 2101</MenuItem>
        <MenuItem value={"2011-01-01"}>2011 - 2040</MenuItem>
        <MenuItem value={"2041-01-01"}>2041 - 2070</MenuItem>
        <MenuItem value={"2071-01-01"}>2071 - 2100</MenuItem>
      </Select>
    </FormControl>
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
              <OtherControls
                rcp={rcp}
                setRcp={setRcp}
                horizon={horizon}
                setHorizon={setHorizon}
                temporalAggregation={temporalAggregation}
                setTemporalAggregation={setTemporalAggregation}
              />
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
                <MapApplication
                  inputs={inputs}
                  outputs={outputs}
                  inputsMd="left"
                  inputsXs="top"
                  outputsMd="right"
                  outputsXs="bottom"
                >
                  <Map onClick={handleMapClick} />
                </MapApplication>
              </Suspense>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
