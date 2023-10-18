import PropTypes from 'prop-types';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import { Box } from '@mui/system';

MapLegend.propTypes = {
  large: PropTypes.bool,
  drawerRight: PropTypes.bool,
  drawerBottom: PropTypes.bool,
};

function MapLegend({ large, drawerRight, drawerBottom }) {
  const [openLegend, setOpenLegend] = useState(false);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          right: drawerRight ? '28%' : '8%',
          bottom: drawerBottom ? '30%' : '5%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton
            sx={{
              color: 'black',
              background: 'white',
              borderRadius: '9px',
              padding: '3px',
              marginBottom: '5px',
              '&:hover': {
                background: 'white',
              },
            }}
            onClick={() => {
              setOpenLegend((openLegend) => !openLegend);
            }}
          >
            {openLegend ? (
              <SouthEastIcon fontSize={large ? 'medium' : 'large'} />
            ) : (
              <NorthWestIcon fontSize={large ? 'medium' : 'large'} />
            )}
          </IconButton>
        </div>
        {openLegend ? (
          <div
            style={{
              maxWidth: '45rem',
              background: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '4px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>Tropical Nights (days)</div>
            <div>
              <Box
                component="img"
                sx={{
                  height: '5rem',
                  width: '50rem',
                  maxWidth: drawerRight ? '33rem' : '55rem',
                }}
                alt="Legend"
                src="/images/tropical_nights_legend.png"
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default MapLegend;
