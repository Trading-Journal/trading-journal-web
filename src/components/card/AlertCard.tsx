import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';

interface AlertProps {
  severity: any;
  show: boolean;
  children: React.ReactNode;
  mt?: number;
  mb?: number;
  closeable?: boolean;
}

export const AlertCard: React.FC<AlertProps> = ({
  severity,
  show,
  children,
  mt = 0,
  mb = 0,
  closeable = true,
}) => {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const Action = () => {
    if (closeable) {
      return (
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Collapse in={open}>
      <Alert severity={severity} sx={{ mt, mb }} action={<Action />}>
        <span style={{ whiteSpace: 'pre-line' }}>{children}</span>
      </Alert>
    </Collapse>
  );
};
