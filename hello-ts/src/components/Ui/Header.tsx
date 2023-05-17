import React from 'react';

import Box from '@mui/material/Box';

import Logo from '@components/Ui/Logo';


const Header = (): JSX.Element => (
  <Box component="header" sx={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', 
    width:"100%" }}>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <Logo />
    </div>
  </Box>
);

export default Header;
