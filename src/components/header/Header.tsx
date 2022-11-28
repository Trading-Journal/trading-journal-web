import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, subtitle, icon } = props;

  return (
    <>
      {icon && <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>{icon}</Avatar>}
      <Typography fontSize={20}>{title}</Typography>
      {subtitle && <Typography>{subtitle}</Typography>}
    </>
  );
};
