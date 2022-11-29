import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react';

interface SubmitButtonProps {
  loading: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  children = undefined,
  fullWidth = true,
  disabled = false,
  ...rest
}) => {
  return (
    <LoadingButton
      type="submit"
      fullWidth={fullWidth}
      variant="contained"
      loading={loading}
      disabled={disabled}
      {...rest}
    >
      {children || 'Save'}
    </LoadingButton>
  );
};
