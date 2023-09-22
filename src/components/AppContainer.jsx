import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

export default function AppContainer({ children, sx = {} }) {
  return (
    <Container maxWidth="false" disableGutters sx={{ height: '100dvh', ...sx }}>
      <Grid container spacing={0} sx={{ height: '100dvh' }}>
        {children}
      </Grid>
    </Container>
  );
}
