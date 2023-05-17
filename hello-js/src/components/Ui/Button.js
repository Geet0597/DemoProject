import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Button = styled(MuiButton)(({ theme }) => ({
  padding: theme.spacing(1, 4),
  borderRadius: theme.border.radius.medium,
  '&:hover': {},
  '&-contained': {},
  '&-text': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export default Button;
