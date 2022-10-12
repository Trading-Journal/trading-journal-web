import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  doLogin,
  useAuthDispatch,
  useAuthState,
} from '../../context/UserContext';

export const Login = () => {
  const { user: loggedUser, status, error } = useAuthState();
  const dispatch = useAuthDispatch();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('eliasnitzsche@mail.com');
  const [password, setPassword] = useState('449#5GdPBab6@FQQ');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    doLogin(dispatch, email, password).finally(() => setLoading(false));
  };

  if (loggedUser) return <Navigate to="/journals" />;

  const ErrorAlert = (props: any) => {
    const { show, message, closeable } = props;
    const [open, setOpen] = React.useState(show);
    if (open) {
      if (closeable) {
        <Collapse in={open}>
          <Alert onClose={() => setOpen(false)} severity="error">
            {message}
          </Alert>
        </Collapse>;
      }
      return <Alert severity="error">{message}</Alert>;
    }
    return <div></div>;
  };

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
        <ErrorAlert
          show={status === 'rejected'}
          message={error}
          closeable={false}
        />
      </Box>
    </Box>
  );
};
