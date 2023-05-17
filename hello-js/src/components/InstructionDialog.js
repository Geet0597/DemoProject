import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';

import Surface from '@components/Ui/Surface';
import DialogFooter from '@components/Ui/DialogFooter';
import InstructionStep from '@components/InstructionStep';

import instructions from '@lib/instructions';

const InstructionDialog = ({ step, open, onNext, onPrevious, onEnd }) => {
  const [triedToClose, setTriedToClose] = useState(false);

  const handleClose = (event, reason) => {
    if (['backdropClick', 'escapeKeyDown'].includes(reason)) {
      return setTriedToClose(true);
    }

    onEnd(event);
  };

  const nextStep = () => {
    setTriedToClose(false);
    onNext();
  };

  const previousStep = () => {
    setTriedToClose(false);
    onPrevious();
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
