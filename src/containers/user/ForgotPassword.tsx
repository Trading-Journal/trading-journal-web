import PasswordIcon from '@mui/icons-material/Password';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { AlertCard } from 'components/card';
import { TextInput } from 'components/input';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { requestChangePassword } from 'services';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const mutation = useMutation((email: string) => requestChangePassword(email));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(email);
  };

  if (mutation.isSuccess) {
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
          <TextInput
            required
            label="Email Address"
            onChange={(value) => setEmail(value)}
            value={email}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={mutation.isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Change my password
          </LoadingButton>
          {mutation.isError && mutation.error instanceof Error ? (
            <AlertCard
              show={true}
              message={mutation.error.message}
              severity="error"
            />
          ) : null}

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
