import TuneIcon from '@mui/icons-material/Tune';
import React from 'react';
import { ButtonIcon } from './ButtonIcon';
import { PropsButtonIcon } from './PropsButtonIcon';

export const SettingsButton: React.FC<PropsButtonIcon> = ({
  label = 'Add',
  onClick,
  fontSize = 15,
}) => {
  return (
    <ButtonIcon
      icon={<TuneIcon sx={{ fontSize: fontSize }} />}
      onClick={onClick}
      fontSize={fontSize}
      label={label}
    />
  );
};
