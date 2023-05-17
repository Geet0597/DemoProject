import { createTheme, responsiveFontSizes } from '@mui/material';

const palette = {
  primary: {
    main: 'rgb(0, 50, 200)',
  },
  secondary: {
    main: '#fff',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  success: { main: '#EDF7E6' },
  info: { main: '#E6F4F7' },
  warning: { main: '#F7F1E6' },
  error: { main: '#F7E6E9' },
  divider: 'rgba(0, 0, 0, 0.1)',
};

const typography = {
  fontFamily: 'Poppins, sans-serif',
  body1: {
    fontWeight: 400,
    color: palette.secondary.contrastText,
  },
};

const border = {
  radius: {
    small: 16,
    medium: 24,
    large: 32,
  },
};

const components = [];

const theme = responsiveFontSizes(createTheme({ palette, typography, border, components }));

export default theme;
