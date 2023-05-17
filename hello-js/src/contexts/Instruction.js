import { useState } from 'react';

export const INSTRUCTION_COMPLETED_KEY = 'instruction.shown';

export const useInstruction = (startStep = 0) => {
  const [completed, setCompleted] = useState(!!localStorage.getItem(INSTRUCTION_COMPLETED_KEY));
  const [forceOpen, setForceOpen] = useState(false);
  const [step, setStep] = useState(startStep);

  const open = () => {
    setStep(0);
    setForceOpen(true);
  };

  const next = () => {
    setStep((s) => s + 1);
  };

  const previous = () => {
    setStep((s) => s - 1);
  };

  const end = () => {
    localStorage.setItem(INSTRUCTION_COMPLETED_KEY, true);
    setCompleted(true);
    setForceOpen(false);
  };

  return {
    step,
    open,
    next,
    previous,
    end,
    isOpen: forceOpen || !completed,
  };
};
