import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

export const ContentDialog = (Component: any) => {
  return function OpenDialog({
    open: isOpen = false,
    title = '',
    fullScreen = false,
    ...props
  }: any) {
    const [open, setOpen] = useState(isOpen);

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Dialog open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Component {...props} />
        </DialogContent>
      </Dialog>
    );
  };
};
