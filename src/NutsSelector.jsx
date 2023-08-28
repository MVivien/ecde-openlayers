import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { EVENT_GROUP_SET_LAYERS } from './constants';
import { registerEvent } from './map_events';

const NUTS = [
  { name: 'NUTS 0', url: '/nuts_0.json' },
  { name: 'NUTS 1', url: '/nuts_1.json' },
  { name: 'NUTS 2', url: '/nuts_2.json' },
];

function NutsSelector() {
  const [nut, setNut] = useState(NUTS[0].name);

  const handleChange = (event) => {
    setNut(event.target.value);
  };

  useEffect(() => {
    if (nut) {
      const { name, url } = NUTS.find((item) => item.name === nut);
      const event = new CustomEvent(EVENT_GROUP_SET_LAYERS, {
        detail: {
          group: 'nuts',
          layers: [
            { type: 'vector', sourceType: 'vector', params: { name }, sourceParams: { url } },
          ],
        },
      });
      registerEvent(event);
    }
  }, [nut]);

  return (
    <Box>
      <FormGroup>
        <FormControl fullWidth>
          <FormLabel id="nuts">NUTS</FormLabel>
          <RadioGroup aria-labelledby="nuts" value={nut} onChange={handleChange}>
            {NUTS.map((nut) => (
              <FormControlLabel
                key={nut.name}
                value={nut.name}
                control={<Radio />}
                label={nut.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </FormGroup>
    </Box>
  );
}

export default NutsSelector;
