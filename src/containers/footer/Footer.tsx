import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 1,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        height: '4vh',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}.
        </Typography>
      </Container>
    </Box>
  );
};
