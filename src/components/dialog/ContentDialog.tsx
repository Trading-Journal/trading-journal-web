import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export const ContentDialog = (Component: any) => {
  return function OpenDialog({ open = false, title = '', ...props }: any) {
    return (
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Component {...props} />
        </DialogContent>
      </Dialog>
    );
  };
};
