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
          right: drawerRight ? '28%' : '5%',
          bottom: drawerBottom ? '30%' : large ? '20%' : '5%',
          width: '80%',
          zIndex: 2,
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
      </div>
      {openLegend ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            right: large ? '29%' : '23%',
            bottom: '5%',
          }}
        >
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
                  maxWidth: '33rem',
                }}
                alt="Legend"
                src="/images/tropical_nights_legend.png"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MapLegend;
