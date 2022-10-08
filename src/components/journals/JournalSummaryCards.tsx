import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { AccountBalanceCard } from '../balance-card/AccountBalanceCard';
import { ClosedPositionsCard } from '../balance-card/ClosedPositionsCard';
import { DepositsCard } from '../balance-card/DepositsCard';
import { StartBalanceCard } from '../balance-card/StartBalanceCard';
import { TaxesCard } from '../balance-card/TaxesCard';
import { WithdrawalsCard } from '../balance-card/WithdrawalsCard';

import { useEffect, useState } from 'react';
import { JournalModel } from '../../model/JournalModel';

export const JournalSummaryCards = (props: any) => {
  const [journal, setJournal] = useState<JournalModel>();

  useEffect(() => {
    setJournal(props.journal);
  }, [props]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={4}>
          <StartBalanceCard journal={journal} />
        </Grid>
        <Grid xs={12} sm={4}>
          <AccountBalanceCard journal={journal} />
        </Grid>
        <Grid xs={12} sm={4}>
          <ClosedPositionsCard journal={journal} />
        </Grid>
        <Grid xs={12} sm={4}>
          <DepositsCard journal={journal} />
        </Grid>
        <Grid xs={12} sm={4}>
          <WithdrawalsCard journal={journal} />
        </Grid>
        <Grid xs={12} sm={4}>
          <TaxesCard journal={journal} />
        </Grid>
      </Grid>
    </Box>
  );
};
