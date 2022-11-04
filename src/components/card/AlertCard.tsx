import Collapse from '@mui/material/Collapse';
import React, { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';

interface AlertProps {
  severity: any;
  show: boolean;
  message: string;
  mt?: number;
  mb?: number;
}

export const AlertCard: React.FC<AlertProps> = ({
  severity,
  show,
  message,
  mt = 0,
  mb = 0,
}) => {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show, open]);

  return (
    <Collapse in={open}>
      <Alert severity={severity} sx={{ mt, mb }}>
        <span style={{ whiteSpace: 'pre-line' }}>{message}</span>
      </Alert>
    </Collapse>
  );
};
