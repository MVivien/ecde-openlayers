import App from './App.jsx';

import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './reset.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: '1rem',
      fontFamily: 'Calibri',
      /*'@media (min-width:600px)': {
           fontSize: '1.5rem',
          },*/
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          width: '40%',
          borderRadius: '5px',
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
