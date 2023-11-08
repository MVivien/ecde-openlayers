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
  childApp: PropTypes.bool,
};

function MapLegend({ large, drawerRight, drawerBottom, childApp }) {
  const [openLegend, setOpenLegend] = useState(false);
  const isRightDrawerOpen = drawerRight && childApp;
  const isBottomDrawerOpen = drawerBottom && childApp;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          right: large ? (isRightDrawerOpen ? '37%' : '5%') : '5%',
          bottom: !large ? (isBottomDrawerOpen ? `28%` : '5%') : '5%',
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
            right: large ? (isRightDrawerOpen ? '36%' : '30%') : '17%',
            bottom: isBottomDrawerOpen && !large ? '28%' : '5%',
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
                  maxWidth: large ? '33rem' : '17rem',
                }}
                alt="Legend"
                src="images/tropical_nights_legend.png"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MapLegend;
