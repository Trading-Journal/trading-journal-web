import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import {
  doLogin,
  useAuthDispatch,
  useAuthState,
} from '../../context/UserContext';
import { AlertCard } from '../alert-card/AlertCard';

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
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <AlertCard
          show={status === 'rejected'}
          message={error}
          severity="error"
        />
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/register">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
