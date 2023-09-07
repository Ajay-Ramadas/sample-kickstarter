import { createTheme, ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#90ADC6'
    },
    secondary: {
      main: '#333652'
    },
    text: {
      primary: '#333652',
      secondary: '#90ADC6'
    }
  }
};

export const customTheme = createTheme(themeOptions);
