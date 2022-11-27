import { Grid } from '@mui/material';
import { FormButtons } from 'components/button';
import { FormAlert } from 'components/card';
import { Form } from 'components/form/Form';
import { Datetime, NumberInput } from 'components/input';
import { Deposit, Entry, Journal } from 'model';
import { useSaveDeposit } from 'queries';
import React, { useEffect, useState } from 'react';
import { getSymbol } from 'utilities';

const initialState: Deposit = {
  date: new Date(),
  price: 0,
};

interface FormProps {
  journal: Journal;
  onSave: (entry: Entry | undefined) => void;
  onCancel: () => void;
}

export const DepositForm: React.FC<FormProps> = (props: FormProps) => {
  const { journal, onSave, onCancel } = props;
  const [deposit, setDeposit] = useState<Deposit>(initialState);
  const [currency] = useState(getSymbol(journal.currentBalance.currency));

  const mutation = useSaveDeposit(journal.id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(deposit);
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
    <Form title="Deposit" maxWidth={500} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Datetime
            label="Deposit date"
            required
            value={deposit.date}
            onChange={(value) => setDeposit({ ...deposit, date: value! })}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <NumberInput
            label={`Deposit Value (${currency})`}
            scale={2}
            value={deposit.price}
            required
            onChange={(value) => setDeposit({ ...deposit, price: value! })}
          />
        </Grid>
      </Grid>
      <FormAlert mutation={mutation} />
      <FormButtons loading={mutation.isLoading} handleCancel={handleCancel} />
    </Form>
  );
};
