import GppBadIcon from '@mui/icons-material/GppBad';
import PendingIcon from '@mui/icons-material/Pending';
import SecurityIcon from '@mui/icons-material/Security';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { FormAlert } from 'components/card';
import { TextInput } from 'components/input';
import { PortalFeedback } from 'components/portal/PortalFeedback';
import { useEffect, useState } from 'react';
import {
  Link as RouterLink,
  Navigate,
  useSearchParams,
} from 'react-router-dom';
import { sendVerification, verify } from 'services';

export const VerifyEmail = () => {
  const mutationVerify = useMutation((hash: string) => verify(hash));

  const mutationSendAgain = useMutation((email: string) =>
    sendVerification(email)
  );

  const [email, setEmail] = useState('');
  const [searchParams] = useSearchParams();
  const hash = searchParams.get('hash') ?? '';

  useEffect(() => {
    if (hash) {
      mutationVerify.mutate(hash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  if (!hash) return <Navigate to="/Login" />;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutationSendAgain.mutate(email);
  };

  if (mutationVerify.isLoading) {
    return (
      <div>
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
            <PendingIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verifying your email
          </Typography>
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={mutationVerify.isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  if (mutationSendAgain.isSuccess) {
    return (
      <div>
        <PortalFeedback
          icon={<ThumbUpIcon />}
          header="Almost there, if your account exists check your email"
          subtitle="Otherwise, create your account clicking bellow"
          link={{ to: '/register', label: "Don't have an account? Sign Up" }}
        ></PortalFeedback>
      </div>
    );
  }

  if (mutationVerify.isError) {
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
          <GppBadIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Failed to verify email
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextInput
            required
            autoFocus
            label="Email Address"
            onChange={(value) => setEmail(value)}
            value={email}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={mutationSendAgain.isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Send the verification link again
          </LoadingButton>
        </Box>
        <FormAlert mutation={mutationSendAgain} />
        <FormAlert mutation={mutationVerify} />
        <Link component={RouterLink} to="/login" variant="h5" sx={{ mt: 5 }}>
          Go back to login and start trading
        </Link>
      </Box>
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
        <SecurityIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Email Successfully Verified
      </Typography>

      <Link component={RouterLink} to="/login" variant="h5" sx={{ mt: 10 }}>
        Go back to login and start trading
      </Link>
    </Box>
  );
};
