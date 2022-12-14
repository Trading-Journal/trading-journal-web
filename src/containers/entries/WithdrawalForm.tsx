import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Grid } from '@mui/material';
import { FormButtons } from 'components/button';
import { FormAlert } from 'components/card';
import { Form } from 'components/form/Form';
import { Datetime, NumberInput } from 'components/input';
import { Entry, Journal, Withdrawal } from 'model';
import { useSaveWithdrawal } from 'queries';
import React, { useEffect, useState } from 'react';
import { getSymbol } from 'utilities';

const initialState: Withdrawal = {
  date: new Date(),
  price: 0,
};

interface FormProps {
  journal: Journal;
  onSave: (entry: Entry | undefined) => void;
  onCancel: () => void;
}

export const WithdrawalForm: React.FC<FormProps> = (props: FormProps) => {
  const { journal, onSave, onCancel } = props;
  const [withdrawal, setWithdrawal] = useState<Withdrawal>(initialState);
  const [currency] = useState(getSymbol(journal.currency));

  const mutation = useSaveWithdrawal(journal.id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(withdrawal);
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
    <Form
      title="Withdrawal"
      maxWidth={500}
      onSubmit={handleSubmit}
      icon={<CurrencyExchangeIcon />}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Datetime
            label="Withdrawal date"
            required
            value={withdrawal.date}
            onChange={(value) => setWithdrawal({ ...withdrawal, date: value! })}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <NumberInput
            label={`Withdrawal Value (${currency})`}
            scale={2}
            value={withdrawal.price}
            required
            autoFocus
            onChange={(value) =>
              setWithdrawal({ ...withdrawal, price: value! })
            }
          />
        </Grid>
      </Grid>
      <FormAlert mutation={mutation} />
      <FormButtons loading={mutation.isLoading} handleCancel={handleCancel} />
    </Form>
  );
};
