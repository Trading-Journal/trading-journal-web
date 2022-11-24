import { FormControl, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { Direction } from '../../model/Direction';
import { Entry } from '../../model/Entry';
import { Journal } from '../../model/Journal';
import { Trade } from '../../model/Trade';
import { currencyFormatter, getSymbol } from '../../util/NumberFormat';
import { FormButtons } from '../button/FormButtons';
import { FormAlert } from '../card/FormAlert';
import { Datetime } from '../input/date-time/DateTime';
import { useSaveTrade } from '../queries/EntriesQueries';
import { Header } from './Header';

const initialState: Trade = {
  date: new Date(),
  price: 0,
  size: 0,
  symbol: '',
  direction: Direction.LONG,
  graphType: undefined,
  graphMeasure: undefined,
  profitPrice: undefined,
  lossPrice: undefined,
  costs: undefined,
  exitPrice: undefined,
  exitDate: undefined,
  notes: undefined,
};

interface TradeProps {
  journal: Journal;
  update?: Trade;
  entryId?: string;
  onSave: (entry: Entry | undefined) => void;
  onCancel: () => void;
}

export const DepositForm: React.FC<TradeProps> = (props: TradeProps) => {
  const { journal, update, entryId, onSave, onCancel } = props;
  const [trade, setTrade] = useState<Trade>(initialState);
  const [finished, setFinished] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string | undefined>(undefined);

  const mutation = useSaveTrade(journal.id, entryId);

  useEffect(() => {
    if (update) {
      setTrade(update);
      setTitle(
        `Edit Trade ${update.symbol} ${update.direction} ${currencyFormatter(
          update.price,
          {
            symbol: getSymbol(journal.currency),
          }
        )}`
      );
      if (update.exitPrice) {
        setFinished(true);
        setSubtitle('Finished Trades can not be modified, only deleted');
      }
    } else {
      setTitle('Add a new Deposit');
    }
  }, [update, journal]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(trade);
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
      <Header title={title} subtitle={subtitle} />

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Datetime
                label="Trade date"
                required
                value={trade.date}
                onChange={(value) => setTrade({ ...trade, date: value! })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Datetime
                label="Trade date"
                required
                value={trade.date}
                onChange={(value) => setTrade({ ...trade, date: value! })}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormAlert mutation={mutation} />
        <FormButtons
          loading={mutation.isLoading}
          handleCancel={handleCancel}
          submitDisabled={finished}
        />
      </Box>
    </Box>
  );
};
