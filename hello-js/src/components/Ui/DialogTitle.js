import MuiDialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

const DialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.primary.main,
  fontWeight: 500,
}));

export default DialogTitle;
