import Box from '@mui/material/Box';
import React from 'react';
import { Header } from '../header/Header';

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  maxWidth?: number;
}

export const Form: React.FC<FormProps> = (props: FormProps) => {
  const { onSubmit, children, title, subtitle, maxWidth, ...rest } = props;

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: maxWidth,
      }}
      component="form"
      onSubmit={onSubmit}
      {...rest}
    >
      <Header title={title} subtitle={subtitle} />
      <Box sx={{ mt: 3 }}>{children}</Box>
    </Box>
  );
};
