import React from 'react';

import Fab from '@mui/material/Fab';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { styled } from '@mui/material/styles';

import Canvas from '@components/Canvas';
import InstructionDialog from '@components/InstructionDialog';
import { useInstruction } from '@contexts/Instruction';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
}));

const Home = () => {
  const instruction = useInstruction();

  return (
    <>
      <Canvas />

      <StyledFab color="primary" aria-label="instruction" onClick={instruction.open}>
        <InfoIcon />
      </StyledFab>

      <InstructionDialog
        step={instruction.step}
        open={instruction.isOpen}
        onNext={instruction.next}
        onPrevious={instruction.previous}
        onEnd={instruction.end}
      />
    </>
  );
};

export default Home;
