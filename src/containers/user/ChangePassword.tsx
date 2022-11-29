import PasswordIcon from '@mui/icons-material/Password';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { SubmitButton } from 'components/button';
import { FormAlert } from 'components/card';
import { TextInput } from 'components/input';
import { PortalFeedback } from 'components/portal/PortalFeedback';
import { ChangePasswordRequest } from 'model';
import React, { useState } from 'react';
import {
  Link as RouterLink,
  Navigate,
  useSearchParams,
} from 'react-router-dom';
import { changePassword } from 'services';

export const ChangePassword = () => {
  const mutation = useMutation((request: ChangePasswordRequest) =>
    changePassword(request)
  );

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
    event.preventDefault();
    mutation.mutate(request);
  };

  if (mutation.isSuccess) {
    return (
      <PortalFeedback
        icon={<ThumbUpIcon />}
        header="Your password as successfully change"
        link={{
          to: '/login',
          label: 'You are all set, go to login',
        }}
      ></PortalFeedback>
    );
  }

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextInput
              required
              label="Email Address"
              onChange={(value) => setRequest({ ...request, email: value })}
              value={request.email}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextInput
              required
              label="Password"
              type="password"
              onChange={(value) => setRequest({ ...request, password: value })}
              value={request.password}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextInput
              required
              label="Confirm password"
              type="password"
              onChange={(value) =>
                setRequest({ ...request, confirmPassword: value })
              }
              value={request.confirmPassword}
            />
          </Grid>
        </Grid>

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
              No account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
