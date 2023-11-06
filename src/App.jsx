import { Suspense, lazy, useState, useEffect } from 'react';

// eslint-disable-next-line no-unused-vars
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Unstable_Grid2';
import MapApplication from './components/MapApplication';
import ChildApp from './ChildApp.jsx';
import Loading from './Loading.jsx';
import { EVENT_GROUP_SET_LAYERS } from './constants';
import { registerEvent } from './map_events';
import { API_BASE } from './config';
import InputPanel from './components/InputPanel';

const Map = lazy(() => import('./Map.jsx'));

function App() {
  const [childApp, setChildApp] = useState(false);
  const [rcp, setRcp] = useState('rcp_4_5');
  const [horizon, setHorizon] = useState('2011-01-01');
  const [region, setRegion] = useState('');
  const [regionName, setRegionName] = useState('');
  const [selectedLayer, setSelectedLayer] = useState('');
  const [regionalAggregation, setRegionalAggregation] = useState('nuts');
  const [temporalAggregation, setTemporalAggregation] = useState('yearly');
  const [month, setMonth] = useState(7);
  const [season, setSeason] = useState(6);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [openPlotDrawer, setOpenPlotDrawer] = useState(false);
  const [mapType, setMapType] = useState('actual');

  const handleMapClick = (lat, lon, region, regionName, selectedLayer) => {
    console.log(`Map clicked at ${lat}, ${lon}, ${region}, ${selectedLayer}`);
    setLat(lat);
    setLon(lon);
    setRegion(region);
    setRegionName(regionName);
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

  useEffect(() => {
    if (rcp) {
      console.log('controler');
      let tempAggregationVar =
        temporalAggregation === 'monthly'
          ? `&month=${month}`
          : temporalAggregation === 'seasonal'
          ? `&season=${season}`
          : '';
      // const { name, url } = NUTS.find((item) => item.name === nut);
      fetch(
        `${API_BASE}/regions/05_tropical_nights?regionalAggregation=${regionalAggregation}&mapType=${mapType}&rcp=${rcp}&horizon=${horizon}&temporalAggregation=${temporalAggregation}${tempAggregationVar}`,
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const event = new CustomEvent(EVENT_GROUP_SET_LAYERS, {
            detail: data,
          });
          registerEvent(event);
        });
    }
  }, [rcp, horizon, temporalAggregation, regionalAggregation, month, season]);

  const inputs = (
    <>
      <InputPanel
        rcp={rcp}
        setRcp={setRcp}
        horizon={horizon}
        setHorizon={setHorizon}
        region={region}
        setRegion={setRegion}
        regionalAggregation={regionalAggregation}
        setRegionalAggregation={setRegionalAggregation}
        regionName={regionName}
        setRegionName={setRegionName}
        temporalAggregation={temporalAggregation}
        setTemporalAggregation={setTemporalAggregation}
        month={month}
        setMonth={setMonth}
        season={season}
        setSeason={setSeason}
        mapType={mapType}
        setMapType={setMapType}
      />
    </>
  );

  const outputs = childApp ? (
    <ChildApp
      onClose={handleClose}
      lat={lat}
      lon={lon}
      region={region}
      regionName={regionName}
      selectedLayer={selectedLayer}
      temporalAggregation={temporalAggregation}
      rcp={rcp}
      month={month}
      season={season}
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
            childApp={childApp}
          >
            <Map onClick={handleMapClick} />
          </MapApplication>
        </Suspense>
      </Grid>
    </>
  );
}

export default App;
