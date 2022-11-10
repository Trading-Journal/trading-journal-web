import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { AccountBalanceCard } from '../balance-card/AccountBalanceCard';
import { ClosedPositionsCard } from '../balance-card/ClosedPositionsCard';
import { DepositsCard } from '../balance-card/DepositsCard';
import { StartBalanceCard } from '../balance-card/StartBalanceCard';
import { TaxesCard } from '../balance-card/TaxesCard';
import { WithdrawalsCard } from '../balance-card/WithdrawalsCard';

import React from 'react';
import { BalanceModel } from '../../model/BalanceModel';
import { SimpleCard } from '../card/SimpleCard';

export const JournalBalanceCards: React.FC<{ balance: BalanceModel }> = ({
  balance,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={4}>
          <SimpleCard title="20-02-1984" subtitle="Start Journal" />
        </Grid>
        <Grid xs={12} sm={4}>
          <StartBalanceCard balance={balance} />
        </Grid>
        <Grid xs={12} sm={4}>
          <AccountBalanceCard balance={balance} />
        </Grid>
        <Grid xs={12} sm={6}>
          <SimpleCard title="$ 1.253,03" subtitle="Open Positions" />
        </Grid>
        <Grid xs={12} sm={6}>
          <ClosedPositionsCard balance={balance} />
        </Grid>
        <Grid xs={12} sm={4}>
          <DepositsCard balance={balance} />
        </Grid>
        <Grid xs={12} sm={4}>
          <WithdrawalsCard balance={balance} />
        </Grid>
        <Grid xs={12} sm={4}>
          <TaxesCard balance={balance} />
        </Grid>
      </Grid>
    </Box>
  );
};
