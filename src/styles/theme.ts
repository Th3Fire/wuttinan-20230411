import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#241F3C',
      paper: '#2A263E',
    },
    primary: {
      main: '#1EB095',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#808080',
    },
    success: {
      main: '#159651',
    },
    error: {
      main: '#F73955',
    },
  },
});

export default theme;
