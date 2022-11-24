import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Currency } from '../../model/Currency';
import { Journal, JournalRequest } from '../../model/Journal';
import { getSymbol } from '../../util/NumberFormat';
import { AlertCard } from '../card/AlertCard';
import { Datetime } from '../input/date-time/DateTime';
import { NumberInput } from '../input/number-input/NumberInput';
import { useJournalSave } from '../queries/JournalQueries';
import { CurrencySelect } from './CurrencySelect';

import LoadingButton from '@mui/lab/LoadingButton';

const initialState: JournalRequest = {
  name: '',
  startJournal: new Date(),
  startBalance: 0,
  currency: Currency.DOLLAR,
};

interface JournalProps {
  journal?: Journal;
  onSave: (entry: Journal | undefined) => void;
  onCancel: () => void;
}

const Header = ({ journal }: { journal?: JournalRequest }) => {
  if (journal && journal.id) {
    return <Typography fontSize={20}>Edit {journal.name}</Typography>;
  } else {
    return <Typography fontSize={20}>Add new Journal</Typography>;
  }
};

export const JournalForm: React.FC<JournalProps> = (props: JournalProps) => {
  const { journal: selectedJournal, onCancel, onSave } = props;
  const [journal, setJournal] = useState(initialState);

  const mutation = useJournalSave();

  useEffect(() => {
    if (selectedJournal) {
      setJournal(selectedJournal);
    }
  }, [selectedJournal]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (journal) {
      mutation.mutate(journal);
    }
  };

  if (mutation.isSuccess) {
    onSave(mutation.data);
  }

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
      <Header journal={journal} />

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Journal Name"
                autoFocus
                value={journal.name}
                onChange={(e) =>
                  setJournal({ ...journal, name: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Datetime
                label="Start date"
                required
                value={journal.startJournal}
                onlyDate={true}
                onChange={(value) =>
                  setJournal({ ...journal, startJournal: value! })
                }
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <CurrencySelect
              key="currency-select"
              value={journal.currency}
              onChange={(value) => setJournal({ ...journal, currency: value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <NumberInput
                name="start-balance"
                label={`Start Balance (${getSymbol(journal.currency)})`}
                scale={2}
                value={journal.startBalance}
                onChange={(value) =>
                  setJournal({ ...journal, startBalance: value! })
                }
                {...{ required: true }}
                {...(journal.id && { disabled: true })}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{ mt: 1 }}>
            {mutation.isError && mutation.error instanceof Error ? (
              <AlertCard
                show={true}
                message={mutation.error.message}
                severity="error"
              />
            ) : null}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
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
