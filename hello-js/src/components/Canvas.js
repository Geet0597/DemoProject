import React from 'react';

import Box from '@mui/material/Box';

import { useWindowSize } from '@contexts/WindowSize';

const Canvas = () => {
  const window = useWindowSize();

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <canvas width={window.width} height={window.height}></canvas>
    </Box>
  );
};

export default Canvas;
