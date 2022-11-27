import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import {
  CurrencySelect,
  Datetime,
  NumberInput,
  TextInput,
} from '../../components/input';
import { Currency, Journal, JournalRequest } from '../../model';
import { useJournalSave } from '../../queries';
import { getSymbol } from '../../util';

import { FormButtons } from '../../components/button';
import { FormAlert } from '../../components/card';
import { Form } from '../../components/form/Form';

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

export const JournalForm: React.FC<JournalProps> = (props: JournalProps) => {
  const { journal: selectedJournal, onCancel, onSave } = props;
  const [journal, setJournal] = useState(initialState);
  const [title, setTitle] = useState<string>('');

  const mutation = useJournalSave();

  useEffect(() => {
    if (selectedJournal) {
      setTitle(`Edit ${selectedJournal.name}`);
      setJournal(selectedJournal);
    } else {
      setTitle('Add a new Journal');
    }
  }, [selectedJournal]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (journal) {
      mutation.mutate(journal);
    }
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      onSave(mutation.data);
    }
  }, [mutation, onSave]);

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Form title={title} onSubmit={handleSubmit} maxWidth={400}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextInput
            label="Journal Name"
            required
            value={journal.name}
            autoFocus
            onChange={(value) => setJournal({ ...journal, name: value })}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Datetime
            label="Start date"
            required
            value={journal.startJournal}
            onlyDate={true}
            onChange={(value) =>
              setJournal({ ...journal, startJournal: value! })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <CurrencySelect
            key="currency-select"
            value={journal.currency}
            required
            onChange={(value) => setJournal({ ...journal, currency: value })}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <NumberInput
            name="start-balance"
            label={`Start Balance (${getSymbol(journal.currency)})`}
            scale={2}
            value={journal.startBalance}
            required
            disabled={journal.id !== undefined}
            onChange={(value) =>
              setJournal({ ...journal, startBalance: value! })
            }
          />
        </Grid>
      </Grid>
      <FormAlert mutation={mutation} />
      <FormButtons loading={mutation.isLoading} handleCancel={handleCancel} />
    </Form>
  );
};
