import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, ToggleButtonGroup, ToggleButton, Typography, Divider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { EVENT_GROUP_SET_LAYERS } from './constants';
import { registerEvent } from './map_events';

export default function BasicSelect({ rcp, setRcp, horizon, setHorizon }) {
  const [control2, setControl2] = useState(30);

  const handleRcpChange = (event) => {
    setRcp(event.target.value);
  };
  const handleHorizonChange = (event) => {
    setHorizon(event.target.value);
  };

  useEffect(() => {
    console.log(rcp);
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
                url: `http://localhost:5000/geojson/nuts_2?rcp=${rcp}&horizon=${horizon}`,
              },
            },
            {
              name: `NUTS 1`,
              type: 'vector',
              sourceType: 'vector',
              params: `NUTS 1`,
              sourceParams: {
                url: `http://localhost:5000/geojson/nuts_1?rcp=${rcp}&horizon=${horizon}`,
              },
            },
            {
              name: `NUTS 0`,
              type: 'vector',
              sourceType: 'vector',
              params: `NUTS 0`,
              sourceParams: {
                url: `http://localhost:5000/geojson/nuts_0?rcp=${rcp}&horizon=${horizon}`,
              },
            },
          ],
        },
      });
      registerEvent(event);
    }
  }, [rcp, horizon]);

  const handleChangeCtrl2 = (event) => {
    setControl2(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <FormControl fullWidth>
        <Typography variant="subtitle1" paragraph component="label" align="left">
          Regions
        </Typography>
        <ToggleButtonGroup variant="outlined" aria-label="outlined button group" size="small">
          <ToggleButton value="nuts">NUTS</ToggleButton>
          <ToggleButton value="transnational">Transnational regions</ToggleButton>
          <ToggleButton value="europe">Europe Zones</ToggleButton>
        </ToggleButtonGroup>
        <Divider sx={{ m: 1 }}></Divider>
        <Typography variant="subtitle1" paragraph component="label" align="left">
          Time Span
        </Typography>
        <ToggleButtonGroup variant="outlined" aria-label="outlined button group">
          <ToggleButton value="annual">Year</ToggleButton>
          <ToggleButton value="seasonal">Season</ToggleButton>
          <ToggleButton value="monthly">Month</ToggleButton>
        </ToggleButtonGroup>
        <Divider sx={{ m: 1 }}></Divider>
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
        <Divider sx={{ m: 1 }}></Divider>
      </FormControl>
      <FormControl fullWidth>
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
          size="small"
        >
          <ToggleButton value="1981-01-01">1981-2010</ToggleButton>
          <ToggleButton value="2011-01-01">2011-2040</ToggleButton>
          <ToggleButton value="2041-01-01">2041-2070</ToggleButton>
          <ToggleButton value="2071-01-01">2071-2100</ToggleButton>
        </ToggleButtonGroup>
      </FormControl>
    </Box>
  );
}
