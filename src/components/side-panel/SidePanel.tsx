import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import React from 'react';

interface SidePanelProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  anchor?: 'left' | 'top' | 'right' | 'bottom';
}

export const SidePanel: React.FC<SidePanelProps> = (props: SidePanelProps) => {
  const { open, onClose, children, anchor } = props;

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box sx={{ width: 'auto', p: 2 }}> {children}</Box>
    </Drawer>
  );
};
