import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
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
    </ReactRoutes>
  );
};
