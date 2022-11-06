import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

export const ContentDialog = (Component: any) => {
  return function OpenDialog({
    open: isOpen = false,
    title = '',
    ...props
  }: any) {
    const [scroll] = React.useState<DialogProps['scroll']>('paper');

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
      if (isOpen) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [isOpen]);

    return (
      <Dialog open={isOpen} scroll={scroll}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            <Component {...props} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button>Cancel</Button>
          <Button>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    );
  };
};
