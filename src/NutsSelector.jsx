import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const NUTS = [
  { name: 'NUTS 0', url: '/data/nuts_0.json' },
  { name: 'NUTS 1', url: '/data/nuts_1.json' },
  { name: 'NUTS 2', url: '/data/nuts_2.json' },
];

function NutsSelector({ mapContainerId }) {
  const [nut, setNut] = useState('');

  const handleChange = (event) => {
    setNut(event.target.value);
  };

  useEffect(() => {
    if (nut) {
      const nutObject = NUTS.find((item) => item.name === nut);
      const event = new CustomEvent('ol:add-nuts', { detail: { ...nutObject } });
      document.getElementById(mapContainerId).dispatchEvent(event);
    }
  }, [nut, mapContainerId]);

  return (
    <Box>
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
    </Box>
  );
}

NutsSelector.propTypes = {
  mapContainerId: PropTypes.string.isRequired,
};

export default NutsSelector;
