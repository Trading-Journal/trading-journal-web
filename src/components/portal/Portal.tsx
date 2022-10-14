import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React from 'react';

interface PortalProps {
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  return (
    <Grid container component="main" sx={{ height: '96vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random/?money)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
        {children}
      </Grid>
    </Grid>
  );
};
