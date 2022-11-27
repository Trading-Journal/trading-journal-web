import { ChangePassword } from 'pages/change-password/change-password';
import { EmailVerified } from 'pages/email-verified/EmailVerified';
import { ForgotPassword } from 'pages/forgot-password/forgot-password';
import { HomePage } from 'pages/home/HomePage';
import { JournalsPage } from 'pages/journals/JournalsPage';
import { SignIn } from 'pages/signIn/SignIn';
import { SignUp } from 'pages/signup/SignUp';
import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
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
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/email-verified" element={<EmailVerified />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/journals" element={<PrivateRoute />}>
        <Route path="" element={<JournalsPage />} />
      </Route>
      <Route path="/home" element={<PrivateRoute />}>
        <Route path="" element={<HomePage />} />
      </Route>
    </ReactRoutes>
  );
};
