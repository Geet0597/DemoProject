import React from 'react';

import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';

import Header from '@components/Ui/Header';

const Layout = () => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Header />

      <Box component="main" sx={{ width: '100%', height: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
