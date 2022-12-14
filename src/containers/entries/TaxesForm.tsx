import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Grid } from '@mui/material';
import { FormButtons } from 'components/button';
import { FormAlert } from 'components/card';
import { Form } from 'components/form/Form';
import { Datetime, NumberInput } from 'components/input';
import { Entry, Journal, Taxes } from 'model';
import { useSaveTaxes } from 'queries';
import React, { useEffect, useState } from 'react';
import { getSymbol } from 'utilities';

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
  const [currency] = useState(getSymbol(journal.currency));

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
    <Form
      title="Taxes"
      maxWidth={500}
      onSubmit={handleSubmit}
      icon={<AccountBalanceIcon />}
    >
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
            autoFocus
            onChange={(value) => setTaxes({ ...taxes, price: value! })}
          />
        </Grid>
      </Grid>
      <FormAlert mutation={mutation} />
      <FormButtons loading={mutation.isLoading} handleCancel={handleCancel} />
    </Form>
  );
};
