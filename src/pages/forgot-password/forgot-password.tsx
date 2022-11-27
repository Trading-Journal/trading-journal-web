import { Portal } from '../../components/portal/Portal';
import { ForgotPassword as ForgotPasswordComp } from '../../containers/user/ForgotPassword';

export const ForgotPassword = () => {
  return (
    <Portal>
      <ForgotPasswordComp />
    </Portal>
  );
};
