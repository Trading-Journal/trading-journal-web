import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { JournalModel } from '../../model/JournalModel';
import { Entries } from '../entries/Entries';
import { Loading } from '../loading/Loading';
import { useEntries } from '../queries/EntriesQueries';
import { JournalSummary } from './JournalSummary';

export const JournalEntries: React.FC<{ journal: JournalModel }> = ({
  journal,
}) => {
  const EntriesLoading = Loading(Entries);
  const { data, error, isLoading } = useEntries(journal);

  return (
    <Box sx={{ p: 2, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12}>
          <JournalSummary journal={journal} />
        </Grid>
        <Grid xs={12} sm={12}>
          <EntriesLoading isLoading={isLoading} error={error} entries={data} />
        </Grid>
      </Grid>
    </Box>
  );
};
