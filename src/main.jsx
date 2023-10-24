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
      fontSize: '1.2rem',
      fontFamily: "font-family: 'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;",
      /*'@media (min-width:600px)': {
           fontSize: '1.5rem',
          },*/
    },
    h4: {
      fontSize: '1.2rem',
      marginTop: '5px',
      fontWeight: 500,
      '@media only screen and (min-device-width: 200px) and (max-device-width: 900px)': {
        marginTop: '5px',
        fontSize: '1.8rem',
      },
    },
    description: {
      '@media only screen and (min-device-width: 200px) and (max-device-width: 900px)': {
        marginBottom: '5px',
        fontSize: '0.8rem',
      },
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          width: '30%',
          borderRadius: '5px',
          fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          '@media only screen and (min-device-width: 200px) and (max-device-width: 900px)': {
            fontSize: '1.8rem',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          '@media only screen and (min-device-width: 200px) and (max-device-width: 900px)': {
            fontSize: '1.8rem',
          },
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
