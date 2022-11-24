import { Typography } from '@mui/material';
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, subtitle } = props;

  return (
    <>
      <Typography fontSize={20}>{title}</Typography>
      {subtitle && <Typography>{subtitle}</Typography>}
    </>
  );
};
