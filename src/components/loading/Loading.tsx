import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

export const Loading = (Component: any) => {
  return function LoadingComponent({ isLoading = false, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <Container fixed>
        <Skeleton variant="rectangular" sx={{ my: 4, mx: 1 }} />
      </Container>
    );
  };
};
