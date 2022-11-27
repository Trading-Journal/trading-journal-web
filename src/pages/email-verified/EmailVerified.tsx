import { Portal } from 'components/portal/Portal';
import { VerifyEmail } from 'containers/user/VerifyEmail';

export const EmailVerified = () => {
  return (
    <Portal>
      <VerifyEmail />
    </Portal>
  );
};
