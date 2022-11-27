import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import {
  AccountBalanceCard,
  ClosedPositionsCard,
  DepositsCard,
  StartBalanceCard,
  TaxesCard,
  WithdrawalsCard,
} from '../balance-card';

import { Balance } from 'model';
import React from 'react';
import {
  AvailableCard,
  OpenPositionsCard,
  StartJournalCard,
} from '../balance-card';

export const JournalBalanceCards: React.FC<{ balance: Balance }> = ({
  balance,
}) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StartJournalCard balance={balance} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StartBalanceCard balance={balance} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountBalanceCard balance={balance} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <OpenPositionsCard balance={balance} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AvailableCard balance={balance} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ClosedPositionsCard balance={balance} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DepositsCard balance={balance} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <WithdrawalsCard balance={balance} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TaxesCard balance={balance} />
        </Grid>
      </Grid>
    </Box>
  );
};
