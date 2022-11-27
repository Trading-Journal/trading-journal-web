import { Portal } from 'components/portal/Portal';
import { ChangePassword as ChangePasswordComp } from 'containers/user/ChangePassword';

export const ChangePassword = () => {
  return (
    <Portal>
      <ChangePasswordComp />
    </Portal>
  );
};
