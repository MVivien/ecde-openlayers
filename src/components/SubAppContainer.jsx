import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

export default function SubAppContainer({ children, fullHeight = false, sx = {} }) {
  return (
    <Container sx={{ height: fullHeight ? '100dvh' : '100%', ...sx }}>
      <Grid container spacing={0} sx={{ height: fullHeight ? '100dvh' : '100%' }}>
        {children}
      </Grid>
    </Container>
  );
}
