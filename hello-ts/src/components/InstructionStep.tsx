import React from 'react';
import PropTypes from 'prop-types';

import htmlParser from 'html-react-parser';

import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

import Button from '@components/Ui/Button';
import DialogTitle from '@components/Ui/DialogTitle';
import DialogActions from '@components/Ui/DialogActions';
import DialogFooter from '@components/Ui/DialogFooter';

export interface InstructionStepProps {
  title: string;
  content: string;
  footer?: string;
  previous?: string;
  next?: string;
  end?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  onEnd?: () => void;
}

const InstructionStep = ({
  title,
  content,
  footer,
  previous,
  next,
  end,
  onPrevious,
  onNext,
  onEnd,
}: InstructionStepProps): JSX.Element => (
  <>
    <DialogTitle>{title}</DialogTitle>

    <DialogContent>
      <Typography>{htmlParser(content)}</Typography>
    </DialogContent>

    <DialogActions>
      {previous && (
        <Button onClick={onPrevious} variant="text">
          {previous}
        </Button>
      )}
      {next && (
        <Button onClick={onNext} variant="contained">
          {next}
        </Button>
      )}
      {end && (
        <Button onClick={onEnd} variant="contained">
          {end}
        </Button>
      )}
    </DialogActions>
    {footer && <DialogFooter>{htmlParser(footer)}</DialogFooter>}
  </>
);

InstructionStep.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  footer: PropTypes.string,
  previous: PropTypes.string,
  next: PropTypes.string,
  end: PropTypes.string,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  onEnd: PropTypes.func,
};

export default InstructionStep;
