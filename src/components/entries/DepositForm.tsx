import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Deposit } from '../../model/Deposit';
import { Entry } from '../../model/Entry';
import { Journal } from '../../model/Journal';
import { getSymbol } from '../../util/NumberFormat';
import { FormButtons } from '../button/FormButtons';
import { FormAlert } from '../card/FormAlert';
import { Form } from '../form/Form';
import { Datetime } from '../input/date-time/DateTime';
import { NumberInput } from '../input/number-input/NumberInput';
import { useSaveDeposit } from '../queries/EntriesQueries';

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
