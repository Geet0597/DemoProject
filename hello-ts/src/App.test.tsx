import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import App from '@root/App';

import theme from '@root/theme';

const renderApp = (): RenderResult =>
  render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );

describe('<App />', () => {
  it('should render the banner', () => {
    renderApp();

    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument();
  });

  it('should render the main section', () => {
    renderApp();

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});
