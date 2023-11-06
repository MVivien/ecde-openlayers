import PropTypes from 'prop-types';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip, Button } from '@mui/material';

AttributionElement.propTypes = {
  large: PropTypes.bool,
  drawerRight: PropTypes.bool,
  drawerBottom: PropTypes.bool,
  childApp: PropTypes.bool,
};

function AttributionElement() {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const attributions = (
    <>
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noreferrer"
        style={{ color: 'white' }}
      >
        &copy; OpenStreetMap
      </a>
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noreferrer"
        style={{ color: 'white' }}
      >
        &copy; Powered by the <b>Copernicus Climate and Atmosphere Data Store</b>
      </a>
    </>
  );

  return (
    <>
      <div
        style={{
          position: 'relative',
          top: '36rem',
          left: '2rem',
          width: '100%',
          zIndex: 2,
          justifyContent: 'end',
          display: 'none',
        }}
        id="attribution_icon"
      >
        <div>
          <Tooltip
            open={tooltipIsOpen}
            onOpen={() => setTooltipIsOpen(true)}
            onClose={() => setTooltipIsOpen(false)}
            title={attributions}
            placement="left"
          ></Tooltip>
        </div>
        <div style={{ marginRight: 50 }}>
          <IconButton
            sx={{
              color: 'black',
              borderRadius: '9px',
              padding: '3px',
              marginBottom: '10px',
            }}
            onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
          >
            <InfoIcon fontSize={'large'} />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default AttributionElement;
