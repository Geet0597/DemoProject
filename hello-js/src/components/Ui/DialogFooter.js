import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

const DialogFooter = ({ children }) => (
  <Typography
    variant="subtitle1"
    sx={(theme) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mt: 1,
      color: theme.palette.secondary.dark,
      fontSize: theme.typography.pxToRem(13),
    })}>
    {children}
  </Typography>
);

DialogFooter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
};

export default DialogFooter;
