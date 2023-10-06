import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';

SubAppContainer.propTypes = {
  children: PropTypes.any,
  fullHeight: PropTypes.bool,
  sx: PropTypes.object,
};

export default function SubAppContainer({ children, fullHeight = false, sx = {} }) {
  return (
    <Container sx={{ height: fullHeight ? '100dvh' : '100%', ...sx }}>
      <Grid container spacing={0} sx={{ height: fullHeight ? '100dvh' : '100%' }}>
        {children}
      </Grid>
    </Container>
  );
}
