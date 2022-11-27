import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Entry } from '../../model/Entry';
import { Journal } from '../../model/Journal';
import { Withdrawal } from '../../model/Withdrawal';
import { getSymbol } from '../../util/NumberFormat';
import { FormButtons } from '../button';
import { FormAlert } from '../card';
import { Form } from '../form/Form';
import { Datetime, NumberInput } from '../input';
import { useSaveWithdrawal } from '../queries';

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
  const [currency] = useState(getSymbol(journal.currentBalance.currency));

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
    <Form title="Withdrawal" maxWidth={500} onSubmit={handleSubmit}>
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
