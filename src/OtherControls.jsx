import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, ToggleButtonGroup, ToggleButton, Typography, Divider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { EVENT_GROUP_SET_LAYERS } from './constants';
import { registerEvent } from './map_events';

export default function BasicSelect({ rcp, setRcp }) {
  const [control2, setControl2] = useState(30);

  const handleRcpChange = (event) => {
    setRcp(event.target.value);
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
              sourceParams: { url: `http://localhost:5000/geojson/nuts_2?rcp=${rcp}` },
            },
            {
              name: `NUTS 1`,
              type: 'vector',
              sourceType: 'vector',
              params: `NUTS 1`,
              sourceParams: { url: `http://localhost:5000/geojson/nuts_1?rcp=${rcp}` },
            },
            {
              name: `NUTS 0`,
              type: 'vector',
              sourceType: 'vector',
              params: `NUTS 0`,
              sourceParams: { url: `http://localhost:5000/geojson/nuts_0?rcp=${rcp}` },
            },
          ],
        },
      });
      registerEvent(event);
    }
  }, [rcp]);

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
        <InputLabel id="control-2-label">Control 2</InputLabel>
        <Select
          labelId="control-2-label"
          id="control-2"
          value={control2}
          label="Control 2"
          onChange={handleChangeCtrl2}
        >
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={45}>45</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
