import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

interface Props {
  icon: React.ReactElement;
  label?: string;
  onClick: () => void;
  fontSize?: number;
}

export const ButtonIcon: React.FC<Props> = ({
  icon,
  label = 'Add',
  onClick,
  fontSize = 15,
}) => {
  return (
    <Tooltip title={label}>
      <IconButton
        size="small"
        color="primary"
        component="label"
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};
