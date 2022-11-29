import PasswordIcon from '@mui/icons-material/Password';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { SubmitButton } from 'components/button';
import { FormAlert } from 'components/card';
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

          <FormAlert mutation={mutation} />
          <Grid container sx={{ mt: 1, justifyContent: 'space-between' }}>
            <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
              <SubmitButton fullWidth loading={mutation.isLoading}>
                Change my password
              </SubmitButton>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/login">
                Back to Login
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
  }
};
