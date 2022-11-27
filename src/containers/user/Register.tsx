import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AlertCard } from '../../components/card';
import { TextInput } from '../../components/input';
import { PortalFeedback } from '../../components/portal/PortalFeedback';
import { RegisterRequest } from '../../model';
import { signUp } from '../../services';

const initialState: RegisterRequest = {
  companyName: '',
  email: '',
  firstName: '',
  lastName: '',
  userName: '',
  password: '',
  confirmPassword: '',
  newsletter: true,
};

export const Register = () => {
  const mutation = useMutation((request: RegisterRequest) => signUp(request));
  const [request, setRequest] = useState<RegisterRequest>(initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(request);
  };

  if (mutation.isSuccess) {
    if (mutation.data.enabled) {
      return (
        <PortalFeedback
          icon={<ThumbUpIcon />}
          header="Thank you for creating your account"
          link={{
            to: '/login',
            label: 'Your user was successfully created, go to login',
          }}
        ></PortalFeedback>
      );
    } else {
      return (
        <PortalFeedback
          icon={<ThumbUpIcon />}
          header="Almost there, check your email to activate your account"
          subtitle="You can close this window"
        ></PortalFeedback>
      );
    }
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
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextInput
              required
              autoFocus
              label="First Name"
              onChange={(value) => setRequest({ ...request, firstName: value })}
              value={request.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              required
              label="Last Name"
              onChange={(value) => setRequest({ ...request, lastName: value })}
              value={request.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              required
              label="User Name"
              onChange={(value) => setRequest({ ...request, userName: value })}
              value={request.userName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              label="Company Name"
              onChange={(value) =>
                setRequest({ ...request, companyName: value })
              }
              value={request.companyName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              required
              label="Email Address"
              onChange={(value) => setRequest({ ...request, email: value })}
              value={request.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              required
              label="Password"
              type="password"
              onChange={(value) => setRequest({ ...request, password: value })}
              value={request.password}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              required
              label="Confirm Password"
              type="password"
              onChange={(value) =>
                setRequest({ ...request, confirmPassword: value })
              }
              value={request.confirmPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  value="allowExtraEmails"
                  color="primary"
                  checked={request.newsletter}
                  onChange={(e) =>
                    setRequest({ ...request, newsletter: !request.newsletter })
                  }
                />
              }
              label="I want to receive inspiration, marketing promotions and updates via email."
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
          Sign Up
        </LoadingButton>
        {mutation.isError && mutation.error instanceof Error ? (
          <AlertCard
            show={true}
            message={mutation.error.message}
            severity="error"
          />
        ) : null}
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
