import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import { EVENT_GROUP_SET_LAYERS } from './constants';
import { registerEvent } from './map_events.js';

const EC_CHARTS = [
  {
    url: 'http://eccharts.ecmwf.int/wms/?token=public&request=GetCapabilities&version=1.3.0',
    params: { LAYERS: 'composition_bbaod550' },
    name: 'Black carbon aerosol optical depth at 550 nm',
  },
  {
    url: 'http://eccharts.ecmwf.int/wms/?token=public&request=GetCapabilities&version=1.3.0',
    params: { LAYERS: 'composition_so2_surface' },
    name: 'Sulphur dioxide at surface',
  },
  {
    url: 'http://eccharts.ecmwf.int/wms/?token=public&request=GetCapabilities&version=1.3.0',
    params: { LAYERS: 'composition_aod550' },
    name: 'Total aerosol optical depth at 550 nm',
  },
];

function EcChartsSelector() {
  // ecc is an array of true/false values, one for each EC_CHARTS item
  const [ecc, setEcc] = useState(EC_CHARTS.map(({ name }) => name === EC_CHARTS[0].name));

  const handleChange = (event) => {
    const { checked, value: index } = event.target;
    const nextValue = [...ecc];
    nextValue[index] = checked;
    setEcc(nextValue);
  };

  useEffect(() => {
    const eccs = EC_CHARTS.filter((_, index) => ecc[index]);
    const event = new CustomEvent(EVENT_GROUP_SET_LAYERS, {
      detail: {
        group: 'ecc',
        layers: eccs.map(({ url, params: sourceParams, name }) => ({
          type: 'tile',
          sourceType: 'tile',
          params: { title: name },
          sourceParams: { url, params: sourceParams },
        })),
      },
    });
    registerEvent(event);
  }, [ecc]);
  return (
    <Box>
      <FormControl fullWidth>
        <FormLabel id="ecCharts ">ecCharts</FormLabel>
        <FormGroup>
          {EC_CHARTS.map(({ name }, index) => (
            <FormControlLabel
              key={name}
              value={index}
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.8rem' } }}
              control={
                <Checkbox
                  onChange={handleChange}
                  checked={ecc[index]}
                  inputProps={{
                    'aria-label': name,
                  }}
                  size="small"
                  sx={{ '& .MuiSvgIcon-root': { minWidth: '24px', minHeight: '24px' } }}
                />
              }
              label={name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default EcChartsSelector;
