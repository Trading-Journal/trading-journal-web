import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { RegisterModel } from '../../model/RegisterModel';
import { SignUpResponse } from '../../model/SignUpResponse';
import { signUp } from '../../services/Authentication';
import { AlertCard } from '../card/AlertCard';
import { PortalFeedback } from '../portal/PortalFeedback';

const initialState: RegisterModel = {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: '' });
  const [request, setRequest] = useState<RegisterModel>(initialState);
  const [feedback, setFeedback] = useState<SignUpResponse>();

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
      signUp(request)
        .then((response: SignUpResponse) => {
          setFeedback(response);
        })
        .catch((err) => {
          setError({ show: true, message: err.message });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (feedback) {
    if (feedback.enabled) {
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
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={request?.firstName}
              onChange={(e) =>
                setRequest({ ...request, firstName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={request?.lastName}
              onChange={(e) =>
                setRequest({ ...request, lastName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="user-name"
              name="userName"
              required
              fullWidth
              id="userName"
              label="User Name"
              autoFocus
              value={request?.userName}
              onChange={(e) =>
                setRequest({ ...request, userName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="companyName"
              label="Company Name"
              name="companyName"
              autoComplete="family-name"
              value={request?.companyName}
              onChange={(e) =>
                setRequest({ ...request, companyName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={request.email}
              onChange={(e) =>
                setRequest({ ...request, email: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={request?.password}
              onChange={(e) =>
                setRequest({ ...request, password: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="confirm-password"
              value={request?.confirmPassword}
              onChange={(e) =>
                setRequest({ ...request, confirmPassword: e.target.value })
              }
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
          loading={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </LoadingButton>
        <AlertCard show={error.show} message={error.message} severity="error" />
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
