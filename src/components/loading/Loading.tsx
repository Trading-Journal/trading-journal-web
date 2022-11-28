import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AlertCard } from 'components/card';

export const Loading = (Component: any) => {
  return function LoadingComponent({
    isLoading = false,
    error = undefined,
    ...props
  }: any) {
    if (error) {
      return (
        <AlertCard severity="error" show={true}>
          {error.message}
        </AlertCard>
      );
    }

    if (!isLoading) return <Component {...props} />;

    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };
};
