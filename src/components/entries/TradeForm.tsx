import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Direction, Entry, Journal, Trade } from '../../model';
import { currencyFormatter, getSymbol } from '../../util';
import { FormButtons } from '../button';
import { FormAlert } from '../card';
import { Form } from '../form/Form';
import {
  Datetime,
  DirectionSelect,
  GraphTypeSelect,
  NumberInput,
  TextInput,
} from '../input';
import { useSaveTrade } from '../queries';

const initialState: Trade = {
  date: new Date(),
  price: 0,
  size: 0,
  symbol: '',
  direction: Direction.LONG,
  graphType: undefined,
  graphMeasure: '',
  profitPrice: undefined,
  lossPrice: undefined,
  costs: undefined,
  exitPrice: undefined,
  exitDate: undefined,
  notes: '',
};

interface TradeProps {
  journal: Journal;
  update?: Trade;
  entryId?: string;
  onSave: (entry: Entry | undefined) => void;
  onCancel: () => void;
}

export const TradeForm: React.FC<TradeProps> = (props: TradeProps) => {
  const { journal, update, entryId, onSave, onCancel } = props;
  const [trade, setTrade] = useState<Trade>(initialState);
  const [finished, setFinished] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string | undefined>(undefined);
  const [currency] = useState(getSymbol(journal.currentBalance.currency));

  const mutation = useSaveTrade(journal.id, entryId);

  useEffect(() => {
    if (update) {
      setTrade(update);
      setTitle(
        `Edit Trade ${update.symbol} ${update.direction} ${currencyFormatter(
          update.price,
          {
            symbol: currency,
          }
        )}`
      );
      if (update.exitPrice) {
        setFinished(true);
        setSubtitle('Finished Trades can not be modified, only deleted');
      }
    } else {
      setTitle('Add a new Trade');
    }
  }, [update, journal, currency]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(trade);
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
      maxWidth={700}
      title={title}
      subtitle={subtitle}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextInput
            label="Symbol"
            required
            value={trade.symbol}
            autoFocus
            onChange={(value) => setTrade({ ...trade, symbol: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Datetime
            label="Trade date"
            required
            value={trade.date}
            onChange={(value) => setTrade({ ...trade, date: value! })}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <DirectionSelect
            key="direction-select"
            onChange={(value: any) => setTrade({ ...trade, direction: value })}
            value={trade.direction}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <NumberInput
            label={`Price (${currency})`}
            scale={2}
            value={trade.price}
            required
            onChange={(value) => setTrade({ ...trade, price: value! })}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <NumberInput
            name="size"
            label="Trade Size"
            scale={2}
            value={trade.size}
            zeroIsNull
            required
            onChange={(value) => setTrade({ ...trade, size: value! })}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <NumberInput
            name="profit"
            label={`Profit Price (${currency})`}
            scale={2}
            value={trade.profitPrice}
            onChange={(value) => setTrade({ ...trade, profitPrice: value })}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <NumberInput
            name="loss"
            label={`Loss Price (${currency})`}
            scale={2}
            value={trade.lossPrice}
            onChange={(value) => setTrade({ ...trade, lossPrice: value })}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <NumberInput
            name="costs"
            label={`Costs Price (${currency})`}
            scale={2}
            value={trade.costs}
            onChange={(value) => setTrade({ ...trade, costs: value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <NumberInput
            name="exit-price"
            label={`Exit Price (${currency})`}
            scale={2}
            value={trade.exitPrice}
            onChange={(value) =>
              setTrade({
                ...trade,
                exitPrice: value === 0 ? undefined : value,
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Datetime
            label="Exit date"
            value={trade.exitDate}
            onChange={(value) => setTrade({ ...trade, exitDate: value! })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <GraphTypeSelect
            key="graph-type-select"
            onChange={(value: any) => setTrade({ ...trade, graphType: value })}
            value={trade.graphType}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            label="Graph Measure"
            value={trade.graphMeasure}
            autoFocus
            onChange={(value) => setTrade({ ...trade, graphMeasure: value })}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            label="Notes"
            value={trade.notes}
            autoFocus
            onChange={(value) => setTrade({ ...trade, notes: value })}
            multiline
            maxRows={4}
          />
        </Grid>
      </Grid>
      <FormAlert mutation={mutation} />
      <FormButtons
        loading={mutation.isLoading}
        handleCancel={handleCancel}
        submitDisabled={finished}
      />
    </Form>
  );
};
