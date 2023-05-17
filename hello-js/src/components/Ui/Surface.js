import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Surface = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(3),
  borderRadius: theme.border.radius.small,
}));

export default Surface;
