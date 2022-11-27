import { useAuthState } from 'context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const { user } = useAuthState();

  return user ? <Outlet /> : <Navigate to="/login" />;
};
