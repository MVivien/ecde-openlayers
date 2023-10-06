import { Suspense, lazy, useState, useEffect } from 'react';

// eslint-disable-next-line no-unused-vars
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Unstable_Grid2';
import MapApplication from './components/MapApplication';
import ChildApp from './ChildApp.jsx';
import Loading from './Loading.jsx';
import ToggleButton from '@mui/material/ToggleButton';
import { ToggleButtonGroup } from '@mui/material';
import Chip from '@mui/material/Chip';
import { EVENT_GROUP_SET_LAYERS } from './constants';
import { registerEvent } from './map_events';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';

const Map = lazy(() => import('./Map.jsx'));

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

  const inputs = (
    <>
      <Chip label="Regions" variant="label" component="label" />
      <ToggleButtonGroup variant="outlined" aria-label="outlined button group">
        <ToggleButton value="nuts">NUTS</ToggleButton>
        <ToggleButton value="transnational">Transnational regions</ToggleButton>
        <ToggleButton value="europe">Europe Zones</ToggleButton>
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
          <Tooltip title="Info about regions">
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#686666"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </SvgIcon>
          </Tooltip>
        </div>
      </ToggleButtonGroup>
      <Chip label="Time span" variant="label" component="label" />
      <ToggleButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        value={temporalAggregation}
        onChange={handleTemporalAggregation}
      >
        <ToggleButton value="yearly">Year</ToggleButton>
        <ToggleButton value="seasonal">Season</ToggleButton>
        <ToggleButton value="monthly">Month</ToggleButton>
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
          <Tooltip title="Info about Time span">
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#686666"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </SvgIcon>
          </Tooltip>
        </div>
      </ToggleButtonGroup>
      <Chip label="Scenario" variant="label" component="label" />
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
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
          <Tooltip title="Info about Scenario">
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#686666"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </SvgIcon>
          </Tooltip>
        </div>
      </ToggleButtonGroup>
      <Chip label="Time Horizon" variant="label" component="label" />
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
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
          <Tooltip title="Info about Time Horizon">
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#686666"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </SvgIcon>
          </Tooltip>
        </div>
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
