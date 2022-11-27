import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Entry, Journal, Taxes } from '../../model';
import { getSymbol } from '../../util';
import { FormButtons } from '../button';
import { FormAlert } from '../card';
import { Form } from '../form/Form';
import { Datetime, NumberInput } from '../input';
import { useSaveTaxes } from '../queries';

const initialState: Taxes = {
  date: new Date(),
  price: 0,
};

interface FormProps {
  journal: Journal;
  onSave: (entry: Entry | undefined) => void;
  onCancel: () => void;
}

export const TaxesForm: React.FC<FormProps> = (props: FormProps) => {
  const { journal, onSave, onCancel } = props;
  const [taxes, setTaxes] = useState<Taxes>(initialState);
  const [currency] = useState(getSymbol(journal.currentBalance.currency));

  const mutation = useSaveTaxes(journal.id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(taxes);
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
    <Form title="Taxes" maxWidth={500} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Datetime
            label="Taxes date"
            required
            value={taxes.date}
            onChange={(value) => setTaxes({ ...taxes, date: value! })}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <NumberInput
            label={`Taxes Value (${currency})`}
            scale={2}
            value={taxes.price}
            required
            onChange={(value) => setTaxes({ ...taxes, price: value! })}
          />
        </Grid>
      </Grid>
      <FormAlert mutation={mutation} />
      <FormButtons loading={mutation.isLoading} handleCancel={handleCancel} />
    </Form>
  );
};
