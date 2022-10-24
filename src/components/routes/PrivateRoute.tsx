import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../../context/UserContext';

export const PrivateRoute = () => {
  const { user } = useAuthState();

  return user ? <Outlet /> : <Navigate to="/login" />;
};
