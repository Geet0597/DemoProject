import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '@mui/material/styles';

import InstructionDialog from '@components/InstructionDialog';
import { InstructionStepProps } from '@components/InstructionStep';

import theme from '@root/theme';

const STEP: InstructionStepProps & { index: number } = {
  index: 0,
  title: 'first-step-title',
  content: 'first-step-content',
  next: 'first-step-next',
  previous: 'first-step-previous',
  end: 'first-step-end',
};

jest.mock('@lib/instructions.json', () => [
  {
    title: STEP.title,
    content: STEP.content,
    next: STEP.next,
    previous: STEP.previous,
    end: STEP.end,
  },
]);

const renderInstructionDialog = ({
  step = 0,
  open = true,
  onNext = jest.fn(),
  onPrevious = jest.fn(),
  onEnd = jest.fn(),
}): RenderResult =>
  render(
    <ThemeProvider theme={theme}>
      <InstructionDialog
        open={open}
        step={step}
        onNext={onNext}
        onPrevious={onPrevious}
        onEnd={onEnd}
      />
    </ThemeProvider>
  );

describe('<InstructionDialog />', () => {
  const onNext = jest.fn();
  const onPrevious = jest.fn();
  const onEnd = jest.fn();

  it('should render the step', () => {
    renderInstructionDialog({ step: STEP.index });

    expect(screen.getByText(STEP.title)).toBeInTheDocument();
    expect(screen.getByText(STEP.content)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: STEP.next })).toBeInTheDocument();
  });

  describe('when step has a next action', () => {
    beforeEach(() => {
      renderInstructionDialog({ step: STEP.index, onNext });
    });

    it('should render the next button', () => {
      expect(screen.getByRole('button', { name: STEP.next })).toBeInTheDocument();
    });

    describe('when clicking next button', () => {
      it('should call onNext', () => {
        const button = screen.getByRole('button', { name: STEP.next });
        userEvent.click(button);

        expect(onNext).toHaveBeenCalled();
      });
    });
  });

  describe('when step has a previous action', () => {
    beforeEach(() => {
      renderInstructionDialog({ step: STEP.index, onPrevious });
    });

    it('should render the previous button', () => {
      expect(screen.getByRole('button', { name: STEP.previous })).toBeInTheDocument();
    });

    describe('when clicking previous button', () => {
      it('should call onPrevious', () => {
        const button = screen.getByRole('button', { name: STEP.previous });
        userEvent.click(button);

        expect(onPrevious).toHaveBeenCalled();
      });
    });
  });

  describe('when step has an end action', () => {
    beforeEach(() => {
      renderInstructionDialog({ step: STEP.index, onEnd });
    });

    it('should render the end button', () => {
      expect(screen.getByRole('button', { name: STEP.previous })).toBeInTheDocument();
    });

    describe('when clicking end button', () => {
      it('should call onEnd', () => {
        const button = screen.getByRole('button', { name: STEP.end });
        userEvent.click(button);

        expect(onEnd).toHaveBeenCalled();
      });
    });
  });
});
