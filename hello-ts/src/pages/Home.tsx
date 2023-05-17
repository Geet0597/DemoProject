import React, {useState} from 'react';

import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';

import Canvas from '@components/Canvas';
import InstructionDialog from '@components/InstructionDialog';
import { Instruction, useInstruction } from '@contexts/Instruction';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Tooltip from '@mui/material/Tooltip';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import './Home.css';

export interface ICoords {
  x: number;
  y: number;
  h: number;
  w: number;
}

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
}));

const Home = (): JSX.Element => {
  const instruction: Instruction = useInstruction();
  const [download, setDownload] = useState(false);
  const handle = useFullScreenHandle();
  const [selected, setSelected] = useState(false);
  const [coords, setCoords] = useState({ x: -1,
    y: -1,
    w: -1,
    h: -1});

  const downloadCanvas = () => {
    setDownload(true);
  }

  const onSelected = (rect: ICoords) => {
    setSelected(true);
    setCoords({
      ...rect
    })
  };

  const getSelectionStr = () => {
    if (selected) {
      return `x: ${coords.x}, y: ${coords.y}, w: ${coords.w}, h: ${coords.h}`
    }
    return 'No Selection';
  }

  return (
    <FullScreen handle={handle}>
      <Canvas width={1050} height={650} onSelected={onSelected} download={download} 
        setDownload={setDownload} strokeStyle='#F00' lineWidth= {1} coords={coords}
        handle={handle} />
      <div>
        {getSelectionStr()}
      </div>
      <Tooltip title="Download(D)" placement="right-start" arrow>
        <StyledFab className="download" color="primary" aria-label="instruction" 
          onClick={downloadCanvas}>
          <FileDownloadOutlinedIcon />
        </StyledFab>
      </Tooltip>

      <InstructionDialog
        step={instruction.step}
        open={instruction.isOpen}
        onNext={instruction.next}
        onPrevious={instruction.previous}
        onEnd={instruction.end}
      />
    </FullScreen>
  );
};

export default Home;
