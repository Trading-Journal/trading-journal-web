import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { AlertCard } from 'components/card';
import { useJournalQuery } from 'queries';
import React from 'react';
import { Entries } from '../entries/Entries';
import { JournalBalance } from './JournalBalance';

export const JournalEntries: React.FC<{ journalId: string }> = ({
  journalId,
}) => {
  const { data: journal, error, isSuccess } = useJournalQuery(journalId);

  return (
    <Box sx={{ p: 2, flexGrow: 1 }}>
      {error && (
        <AlertCard show={true} severity="error">
          {error.message}
        </AlertCard>
      )}

      {isSuccess && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <JournalBalance journalId={journalId} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Entries journal={journal} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
