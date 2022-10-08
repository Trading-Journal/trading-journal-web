import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { ButtonIcon } from './ButtonIcon';
import { PropsButtonIcon } from './PropsButtonIcon';

export const EditButton: React.FC<PropsButtonIcon> = ({
  label = 'Add',
  onClick,
  fontSize = 15,
}) => {
  return (
    <ButtonIcon
      icon={<EditIcon sx={{ fontSize: fontSize }} />}
      onClick={onClick}
      fontSize={fontSize}
      label={label}
    />
  );
};
