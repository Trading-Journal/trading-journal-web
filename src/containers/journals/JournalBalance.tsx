import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Accordion } from 'components/accordion/Accordion';
import { Balance } from 'model';
import { useJournalBalanceQuery } from 'queries';
import React from 'react';
import { JournalBalanceCards } from './JournalBalanceCards';

const BalanceCards = ({ balance }: { balance: Balance }) => {
  return <JournalBalanceCards balance={balance} />;
};

export const JournalBalance: React.FC<{ journalId: string }> = ({
  journalId,
}) => {
  const { data: balance, isSuccess } = useJournalBalanceQuery(journalId);

  return (
    <>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Accordion title="Journal Summary">
          {isSuccess && <BalanceCards balance={balance}></BalanceCards>}
        </Accordion>
      </Box>
      <Grid container sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {isSuccess && <BalanceCards balance={balance}></BalanceCards>}
      </Grid>
    </>
  );
};
