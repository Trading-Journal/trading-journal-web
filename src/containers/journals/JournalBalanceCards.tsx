import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { AccountBalanceCard, ClosedPositionsCard } from '../balance-card';

import { Balance } from 'model';
import React from 'react';
import { OpenPositionsCard } from '../balance-card';

export const JournalBalanceCards: React.FC<{ balance: Balance }> = ({
  balance,
}) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <AccountBalanceCard balance={balance} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <OpenPositionsCard balance={balance} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <ClosedPositionsCard balance={balance} />
        </Grid>
      </Grid>
    </Box>
  );
};
