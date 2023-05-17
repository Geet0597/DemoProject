import React from 'react';

import Box from '@mui/material/Box';

import Logo from '@components/Ui/Logo';

const Header = () => (
  <Box component="header" sx={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}>
    <Logo />
  </Box>
);

export default Header;
