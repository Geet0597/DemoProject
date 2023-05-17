import React from 'react';

import Box from '@mui/material/Box';

const Logo = (): JSX.Element => (
  <Box sx={{ m: 2, filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))' }}>
    <img src="logo192.png" alt="Depix Logo" width="48" />
  </Box>
);

export default Logo;
