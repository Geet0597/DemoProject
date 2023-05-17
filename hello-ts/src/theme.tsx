import {
  createTheme,
  responsiveFontSizes,
  PaletteColor,
  PaletteOptions,
  Theme,
} from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

const palette: PaletteOptions = {
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

const typography: TypographyOptions = {
  fontFamily: 'Poppins, sans-serif',
  body1: {
    fontWeight: 400,
    color: (palette.secondary as PaletteColor).contrastText,
  },
};

interface RadiusOptions {
  small?: number;
  medium?: number;
  large?: number;
}

interface BorderOptions {
  radius: RadiusOptions;
}

const border: BorderOptions = {
  radius: {
    small: 16,
    medium: 24,
    large: 32,
  },
};

declare module '@mui/material/styles' {
  interface Theme {
    border: BorderOptions;
  }
  interface ThemeOptions {
    border?: BorderOptions;
  }
}

const theme: Theme = responsiveFontSizes(createTheme({ palette, typography, border }));

export default theme;
