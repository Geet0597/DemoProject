import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';

import Surface from '@components/Ui/Surface';
import DialogFooter from '@components/Ui/DialogFooter';
import InstructionStep from '@components/InstructionStep';

import instructions from '@lib/instructions.json';

export interface InstructionDialogProps {
  step: number;
  open: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  onEnd?: () => void;
}

const InstructionDialog = ({ step, open, onNext, onPrevious, onEnd }: InstructionDialogProps) => {
  const [triedToClose, setTriedToClose] = useState(false);

  const handleClose = (_: never, reason: string) => {
    if (['backdropClick', 'escapeKeyDown'].includes(reason)) {
      return setTriedToClose(true);
    }

    onEnd && onEnd();
  };

  const nextStep = () => {
    setTriedToClose(false);
    onNext && onNext();
  };

  const previousStep = () => {
    setTriedToClose(false);
    onPrevious && onPrevious();
  };

  const steps = instructions.map((instruction) => (
    <InstructionStep
      key={instruction.title}
      {...instruction}
      onNext={nextStep}
      onPrevious={previousStep}
      onEnd={onEnd}
    />
  ));

  return (
    <Dialog
      id="instruction-dialog"
      open={open}
      onClose={handleClose}
      sx={{ textAlign: 'center' }}
      PaperComponent={Surface}
      aria-label="instructions"
      aria-labelledby="instruction-dialog">
      {steps[step]}

      {triedToClose && (
        <DialogFooter>
          Nice try ;) But it&apos;s preferred to read all the instructions.
        </DialogFooter>
      )}
    </Dialog>
  );
};

InstructionDialog.propTypes = {
  step: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
};

export default InstructionDialog;
