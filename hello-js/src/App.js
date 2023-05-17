import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '@pages/Home';
import Layout from '@components/Ui/Layout';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
