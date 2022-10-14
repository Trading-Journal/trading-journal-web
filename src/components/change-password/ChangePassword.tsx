import PasswordIcon from '@mui/icons-material/Password';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import {
  Link as RouterLink,
  Navigate,
  useSearchParams,
} from 'react-router-dom';
import { ChangePasswordRequest } from '../../model/ChangePasswordRequest';
import { changePassword } from '../../services/Authentication';
import { AlertCard } from '../alert-card/AlertCard';

export const ChangePassword = () => {
  const [error, setError] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const [searchParams] = useSearchParams();
  const hash = searchParams.get('hash') ?? '';
  const [request, setRequest] = useState<ChangePasswordRequest>({
    hash: hash,
    email: '',
    password: '',
    confirmPassword: '',
  });

  if (!hash) return <Navigate to="/Login" />;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    if (request.password !== request.confirmPassword) {
      setError({
        show: true,
        message: 'Password and confirmation must be equal',
      });
      setLoading(false);
    } else {
      changePassword(request)
        .then(() => {
          setPasswordChanged(true);
        })
        .catch((err) => {
          setError({ show: true, message: err.message });
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
        <PasswordIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Change Password
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
          value={request.email}
          onChange={(e) => setRequest({ ...request, email: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={request.password}
          autoComplete="current-password"
          onChange={(e) => setRequest({ ...request, password: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm-password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          value={request.confirmPassword}
          autoComplete="current-password"
          onChange={(e) =>
            setRequest({ ...request, confirmPassword: e.target.value })
          }
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          Change my password
        </LoadingButton>
        <AlertCard
          show={error.show && !passwordChanged}
          message={error.message}
          severity="error"
        />
        <AlertCard
          show={passwordChanged}
          message="Password changed, you can go back to Login"
          severity="success"
        />
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/login" variant="body2">
              Back to Login
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
