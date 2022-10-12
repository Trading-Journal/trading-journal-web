import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useEffect, useState } from 'react';
import { useAccessTokenState } from '../../context/UserContext';
import { EntryModel } from '../../model/EntryModel';
import { JournalModel } from '../../model/JournalModel';
import { getAllEntries } from '../../services/EntryService';
import { Entries } from '../entries/Entries';
import { Loading } from '../loading/Loading';
import { JournalSummary } from './JournalSummary';

interface Load {
  loading: boolean;
  entries: EntryModel[];
}

export const JournalEntries: React.FC<{ journal: JournalModel }> = ({
  journal,
}) => {
  const EntriesLoading = Loading(Entries);

  const [appState, setAppState] = useState<Load>({
    loading: false,
    entries: [],
  });

  const accessToken = useAccessTokenState();

  useEffect(() => {
    if (journal) {
      getAllEntries(accessToken, journal.id).then((entries) => {
        setAppState({ loading: false, entries: entries });
      });
    }
  }, [journal, accessToken]);

  return (
    <Box sx={{ p: 2, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12}>
          <JournalSummary journal={journal} />
        </Grid>
        <Grid xs={12} sm={12}>
          <EntriesLoading
            isLoading={appState.loading}
            entries={appState.entries}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
