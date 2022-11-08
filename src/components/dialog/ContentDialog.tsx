import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export const ContentDialog = (Component: any) => {
  return function OpenDialog({
    open: isOpen = false,
    title = '',
    ...props
  }: any) {
    return (
      <Dialog open={isOpen}>
        <DialogContent>
          <Component {...props} />
        </DialogContent>
      </Dialog>
    );
  };
};
