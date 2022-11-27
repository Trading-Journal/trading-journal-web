import PasswordIcon from '@mui/icons-material/Password';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Link as RouterLink,
  Navigate,
  useSearchParams,
} from 'react-router-dom';
import { ChangePasswordRequest } from '../../model';
import { changePassword } from '../../services';
import { AlertCard } from '../card';
import { TextInput } from '../input';
import { PortalFeedback } from '../portal/PortalFeedback';

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
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
