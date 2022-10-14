import { ForgotPassword as ForgotPasswordComp } from '../../components/forgot-password/ForgotPassword';
import { Portal } from '../../components/portal/Portal';

export const ForgotPassword = () => {
  return (
    <Portal>
      <ForgotPasswordComp />
    </Portal>
  );
};
