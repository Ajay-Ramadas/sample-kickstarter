import { SxProps } from '@mui/material/styles';

export const clearButtonSX: SxProps = {
  ':hover': {
    color: 'crimson'
  }
};
export const clearAllButtonSX: SxProps = {
  ...clearButtonSX,
  m: 2
};
