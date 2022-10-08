import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react';
import { ButtonIcon } from './ButtonIcon';
import { PropsButtonIcon } from './PropsButtonIcon';

export const AddButton: React.FC<PropsButtonIcon> = ({
  label = 'Add',
  onClick,
  fontSize = 15,
}) => {
  return (
    <ButtonIcon
      icon={<AddCircleOutlineIcon sx={{ fontSize: fontSize }} />}
      onClick={onClick}
      fontSize={fontSize}
      label={label}
    />
  );
};
