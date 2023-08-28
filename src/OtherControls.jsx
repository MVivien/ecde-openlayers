import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [control1, setControl1] = useState('');
  const [control2, setControl2] = useState(30);

  const handleChangeCtrl1 = (event) => {
    setControl1(event.target.value);
  };

  const handleChangeCtrl2 = (event) => {
    setControl2(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <FormControl fullWidth>
        <InputLabel id="control-1-label">Control 1</InputLabel>
        <Select
          labelId="control-1-label"
          id="control-1"
          value={control1}
          label="Control 1"
          onChange={handleChangeCtrl1}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
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
