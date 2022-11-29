import Button from '@mui/material/Button';
import React from 'react';

interface CancelButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const CancelButton: React.FC<CancelButtonProps> = ({
  onClick,
  children = undefined,
  fullWidth = true,
  disabled = false,
  ...rest
}) => {
  return (
    <Button
      fullWidth={fullWidth}
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children || 'Cancel'}
    </Button>
  );
};
