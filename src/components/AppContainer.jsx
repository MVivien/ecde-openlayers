import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';

AppContainer.propTypes = {
  children: PropTypes.any,
  sx: PropTypes.object,
};

export default function AppContainer({ children, sx = {} }) {
  return (
    <Container maxWidth="false" disableGutters sx={{ height: '100dvh', ...sx }}>
      <Grid container spacing={0} sx={{ height: '100dvh' }}>
        {children}
      </Grid>
    </Container>
  );
}
