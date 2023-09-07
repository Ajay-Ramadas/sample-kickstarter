import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import * as React from 'react';

interface ActionButton {
  verbiage: string;
  endIcon?: React.ReactNode;
}

interface GenericDialogProps {
  callback?: () => unknown;
  content: string;
  title: string;
  success: boolean;
  primaryActionButton: ActionButton;
  secondaryActionButton?: ActionButton;
}

export default function GenericDialog({
  callback,
  content,
  title,
  success,
  primaryActionButton,
  secondaryActionButton
}: GenericDialogProps): JSX.Element {
  const [open, setOpen] = React.useState(true);

  const cta = () => {
    if (callback) {
      callback();
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} maxWidth={'xs'} fullWidth={true}>
      <DialogTitle
        sx={{
          fontWeight: 700,
          color: theme => (success ? theme.palette.success.main : theme.palette.error.main)
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          id="primary-action-button"
          variant="outlined"
          onClick={cta}
          endIcon={primaryActionButton.endIcon ?? <></>}
        >
          {primaryActionButton.verbiage ? primaryActionButton.verbiage : 'Continue'}
        </Button>
        {secondaryActionButton ? (
          <Button
            id="secondary-action-button"
            variant="outlined"
            onClick={cta}
            endIcon={secondaryActionButton.endIcon ?? <></>}
          >
            {secondaryActionButton.verbiage ? secondaryActionButton.verbiage : 'Continue'}
          </Button>
        ) : (
          <></>
        )}
      </DialogActions>
    </Dialog>
  );
}
