import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { SubmitButton } from 'components/button';
import { AlertCard } from 'components/card';
import { TextInput } from 'components/input';
import { doLogin, useAuthDispatch, useAuthState } from 'context/UserContext';
import React, { useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';

export const Login = () => {
  const { user: loggedUser, status, error } = useAuthState();
  const dispatch = useAuthDispatch();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('emailfortestsallan@gmail.com');
  const [password, setPassword] = useState('dad231#$#4');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    doLogin(dispatch, email, password).finally(() => setLoading(false));
  };

  if (loggedUser) return <Navigate to="/journals" />;

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextInput
              required
              autoFocus
              label="Email Address"
              onChange={(value) => setEmail(value)}
              value={email}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextInput
              required
              label="Password"
              type="password"
              onChange={(value) => setPassword(value)}
              value={password}
            />
          </Grid>
        </Grid>
        <AlertCard show={status === 'rejected'} severity="error">
          {error}
        </AlertCard>
        <Grid container sx={{ mt: 1, justifyContent: 'space-between' }}>
          <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
            <SubmitButton fullWidth loading={loading}>
              Sign In
            </SubmitButton>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/forgot-password">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/register">
              {'No account? Sign Up'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
