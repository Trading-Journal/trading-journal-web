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
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import {
  Link as RouterLink,
  Navigate,
  useSearchParams,
} from 'react-router-dom';
import { sendVerification, verify } from '../../services/Authentication';
import { AlertCard } from '../alert-card/AlertCard';
import { PortalFeedback } from '../portal/PortalFeedback';

export const VerifyEmail = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [sentAgain, setSentAgain] = useState(false);
  const [error, setError] = useState({ show: false, message: '' });
  const [email, setEmail] = useState('');
  const [searchParams] = useSearchParams();
  const hash = searchParams.get('hash') ?? '';

  useEffect(() => {
    if (hash) {
      verify(hash)
        .catch((err) => {
          setError({ show: true, message: err.message });
        })
        .finally(() => {
          setPageLoading(false);
        });
    }
  }, [hash]);

  if (!hash) return <Navigate to="/Login" />;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setButtonLoading(true);
    event.preventDefault();
    sendVerification(email)
      .then(() => setSentAgain(true))
      .catch((err) => {
        setError({ show: true, message: err.message });
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  if (pageLoading) {
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
          open={pageLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  if (sentAgain) {
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

  if (error.show) {
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
            loading={buttonLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Send the verification link again
          </LoadingButton>
        </Box>
        <Box sx={{ mt: 5 }}>
          <AlertCard
            show={error.show}
            message={error.message}
            severity="error"
          />
        </Box>
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
