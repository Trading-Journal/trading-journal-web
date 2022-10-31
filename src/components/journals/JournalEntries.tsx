import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { AlertCard } from '../card/AlertCard';
import { Entries } from '../entries/Entries';
import { useJournalQuery } from '../queries/JournalQueries';
import { JournalSummary } from './JournalSummary';

export const JournalEntries: React.FC<{ journalId: string }> = ({
  journalId,
}) => {
  const { data, error, isSuccess } = useJournalQuery(journalId);

  return (
    <Box sx={{ p: 2, flexGrow: 1 }}>
      {error && (
        <AlertCard show={true} message={error.message} severity="error" />
      )}

      {isSuccess && (
        <Grid container spacing={2}>
          <Grid xs={12} sm={12}>
            <JournalSummary journal={data} />
          </Grid>
          <Grid xs={12} sm={12}>
            <Entries journal={data} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
