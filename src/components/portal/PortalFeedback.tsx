import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProp {
  to: string;
  label: string;
}

interface Props {
  icon: React.ReactNode;
  header: string;
  subtitle?: string;
  link?: LinkProp;
}

export const PortalFeedback: React.FC<Props> = (props) => {
  function linkRender(link: LinkProp | undefined) {
    if (link) {
      return (
        <Link component={RouterLink} to={link.to} variant="h5" sx={{ mt: 10 }}>
          {link.label}
        </Link>
      );
    } else {
      return <div></div>;
    }
  }

  function renderSubtitle(subtitle: string | undefined) {
    if (subtitle) {
      return (
        <Typography component="h5" sx={{ mt: 10 }}>
          {subtitle}
        </Typography>
      );
    } else {
      return <div></div>;
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
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>{props.icon}</Avatar>
      <Typography component="h3" variant="h5" sx={{ mt: 10 }}>
        {props.header}
      </Typography>
      {renderSubtitle(props.subtitle)}
      {linkRender(props.link)}
    </Box>
  );
};
