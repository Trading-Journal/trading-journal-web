import { Navigate } from 'react-router-dom';
import { useAuthState } from '../../context/UserContext';

interface Props {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuthState();

  if (user) {
    return children;
  } else {
    return (
      <Navigate
        to={{
          pathname: '/login',
        }}
      />
    );
  }
};
