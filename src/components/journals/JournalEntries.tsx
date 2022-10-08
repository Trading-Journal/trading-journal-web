import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { EntryModel } from '../../model/EntryModel';
import { JournalModel } from '../../model/JournalModel';
import { Entries } from '../entries/Entries';
import { Loading } from '../loading/Loading';
import { JournalSummary } from './JournalSummary';

interface Load {
  loading: boolean;
  entries: EntryModel[];
}

export const JournalEntries = (props: any) => {
  const EntriesLoading = Loading(Entries);

  const [journal, setJournal] = useState<JournalModel>();

  const [appState, setAppState] = useState<Load>({
    loading: false,
    entries: [],
  });

  useEffect(() => {
    setJournal(props.journal);
  }, [props]);

  useEffect(() => {
    // setAppState({ loading: true, entries: [] });
    // const apiUrl = `https://api.github.com/users/hacktivist123/repos`;
    const apiUrl = `./data/entries-jounal-${journal?.id}.json`;
    if (journal) {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((entriesList) => {
          setAppState({ loading: false, entries: entriesList });
        });
    }
  }, [journal]);

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
