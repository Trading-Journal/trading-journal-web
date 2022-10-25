import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { DirectionEnum } from '../../model/DirectionEnum';
import { EntryModel } from '../../model/EntryModel';
import { EntryTypeEnum } from '../../model/EntryTypeEnum';
import { JournalModel } from '../../model/JournalModel';
import { AlertCard } from '../card/AlertCard';
import { Datetime } from '../date-time/DateTime';
import { useEntryMutation } from '../queries/EntriesQueries';
import { DirectionSelect } from './DirectionSelect';
import { EntryTypeSelect } from './EntryTypeSelect';
import { GraphTypeSelect } from './GraphTypeSelect';

const initialState: EntryModel = {
  date: new Date(),
  type: EntryTypeEnum.TRADE,
  price: 0,
  symbol: '',
  direction: DirectionEnum.LONG,
};

interface EntryProps {
  journal: JournalModel;
  entry?: EntryModel;
  onSave: (entry: EntryModel | undefined) => void;
  onCancel: () => void;
}

function renderHeader(journal: JournalModel, entry?: EntryModel) {
  if (entry) {
    return (
      <Typography fontSize={20}>
        Edit {entry.type} {entry.symbol}
      </Typography>
    );
  } else {
    return (
      <Typography fontSize={20}>Add new entry to {journal.name}</Typography>
    );
  }
}

export const Entry: React.FC<EntryProps> = (props: EntryProps) => {
  const { journal, entry: selectedEntry, onSave, onCancel } = props;
  const [entry, setEntry] = useState<EntryModel>(initialState);

  const mutation = useEntryMutation(journal.id);

  useEffect(() => {
    if (selectedEntry) {
      setEntry(selectedEntry);
    }
  }, [selectedEntry]);

  if (mutation.isSuccess) {
    onSave(entry);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(entry);
    mutation.mutate(entry);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {renderHeader(journal, entry)}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <EntryTypeSelect
              key="entry-select"
              onChange={(value: EntryTypeEnum) =>
                setEntry({ ...entry, type: value })
              }
              entry={entry}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                autoComplete="symbol"
                name="symbol"
                required
                fullWidth
                id="symbol"
                label="Symbol"
                autoFocus
                value={entry.symbol}
                onChange={(e) => setEntry({ ...entry, symbol: e.target.value })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Datetime
                label="Entry date"
                required
                value={entry.date}
                onChange={(value) => setEntry({ ...entry, date: value! })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <GraphTypeSelect
              key="graph-type-select"
              onChange={(value: any) =>
                setEntry({ ...entry, graphType: value })
              }
              entry={entry}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DirectionSelect
              key="direction-select"
              onChange={(value: any) =>
                setEntry({ ...entry, direction: value })
              }
              entry={entry}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            {mutation.isError && mutation.error instanceof Error ? (
              <AlertCard
                show={true}
                message={mutation.error.message}
                severity="error"
              />
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={mutation.isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
