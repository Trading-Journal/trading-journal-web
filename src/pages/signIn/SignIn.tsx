import { Portal } from '../../components/portal/Portal';
import { Login } from '../../containers/user/Login';

export const SignIn = () => {
  return (
    <Portal>
      <Login />
    </Portal>
  );
};
