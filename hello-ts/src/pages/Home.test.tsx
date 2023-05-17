import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '@mui/material/styles';

import Home from '@pages/Home';
import { Instruction, useInstruction } from '@contexts/Instruction';

import theme from '@root/theme';

jest.mock('@contexts/Instruction', () => ({
  useInstruction: jest.fn(),
}));

const renderHomePage = (): RenderResult =>
  render(
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );

describe('<Home />', () => {
  const useInstructionMock = useInstruction as jest.Mock<Instruction>;

  const open = jest.fn();
  const next = jest.fn();
  const previous = jest.fn();
  const end = jest.fn();

  beforeEach(() => {
    useInstructionMock.mockReturnValue({
      isOpen: false,
      step: 0,
      open,
      next,
      previous,
      end,
    });
  });

  describe('when instruction open', () => {
    beforeEach(() => {
      useInstructionMock.mockReturnValue({
        isOpen: true,
        step: 0,
        open,
        next,
        previous,
        end,
      });
    });

    it('should render the instruction dialog', () => {
      renderHomePage();

      const dialog: HTMLElement = screen.getByRole('dialog', { name: /instructions/i });
      expect(dialog).toBeInTheDocument();
    });
  });

  it('should render the instruction button', () => {
    renderHomePage();

    const button = screen.getByRole('button', { name: /instruction/i });
    expect(button).toBeInTheDocument();
  });

  describe('when click instruction button', () => {
    it('should open instructions', () => {
      renderHomePage();

      const button = screen.getByRole('button', { name: /instruction/i });
      userEvent.click(button);

      expect(open).toHaveBeenCalled();
    });
  });
});
