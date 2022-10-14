import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import { ChangePassword } from '../../pages/change-password/change-password';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { HomePage } from '../../pages/home/HomePage';
import { JournalsPage } from '../../pages/journals/JournalsPage';
import { SignIn } from '../../pages/signIn/SignIn';
import { PrivateRoute } from './PrivateRoute';

export const Routes = () => {
  return (
    <ReactRoutes>
      <Route
        path=""
        element={
          <Navigate
            to={{
              pathname: '/home',
            }}
          />
        }
      />
      <Route
        path="/"
        element={
          <Navigate
            to={{
              pathname: '/home',
            }}
          />
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/journals"
        element={
          <PrivateRoute>
            <JournalsPage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
    </ReactRoutes>
  );
};
