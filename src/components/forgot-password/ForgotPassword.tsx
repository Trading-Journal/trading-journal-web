import PasswordIcon from '@mui/icons-material/Password';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { requestChangePassword } from '../../services/Authentication';
import { AlertCard } from '../alert-card/AlertCard';

export const ForgotPassword = () => {
  const [error, setError] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [instructions, setInstructions] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    requestChangePassword(email)
      .then(() => {
        setInstructions(true);
      })
      .catch((err) => setError({ show: true, message: err.message }))
      .finally(() => {
        setLoading(false);
      });
  };

  if (instructions) {
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
        <Typography component="h3" variant="h5" sx={{ mt: 10 }}>
          Check you email, with instruction to change your password
        </Typography>
        <Typography component="h5" sx={{ mt: 10 }}>
          You can close this windows
        </Typography>
      </Box>
    );
  } else {
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            show={error.show}
            message={error.message}
            severity="error"
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
  }
};
