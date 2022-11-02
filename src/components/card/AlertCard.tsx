import Collapse from '@mui/material/Collapse';
import React, { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';

interface AlertProps {
  severity: any;
  show: boolean;
  message: string;
}

export const AlertCard: React.FC<AlertProps> = ({
  severity,
  show,
  message,
}) => {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show, open]);

  return (
    <Collapse in={open}>
      <Alert onClose={() => setOpen(false)} severity={severity}>
        <span style={{ whiteSpace: 'pre-line' }}>{message}</span>
      </Alert>
    </Collapse>
  );
};
