import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoadingButton from '@mui/lab/LoadingButton';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { DirectionEnum } from '../../model/DirectionEnum';
import { EntryModel } from '../../model/EntryModel';
import { EntryTypeEnum } from '../../model/EntryTypeEnum';
import { JournalModel } from '../../model/JournalModel';
import {
  currencyFormatter,
  getSymbol,
  percentFormatter,
} from '../../util/NumberFormat';
import { AlertCard } from '../card/AlertCard';
import { Datetime } from '../date-time/DateTime';
import { NumberInput } from '../number-input/NumberInput';
import { useEntrySave } from '../queries/EntriesQueries';
import { DirectionSelect } from './DirectionSelect';
import { EntryTypeSelect } from './EntryTypeSelect';
import { GraphTypeSelect } from './GraphTypeSelect';

const initialState: EntryModel = {
  date: new Date(),
  type: EntryTypeEnum.TRADE,
  price: 0,
  size: 0,
  symbol: '',
  direction: DirectionEnum.LONG,
  graphType: undefined,
  graphMeasure: '',
  profitPrice: undefined,
  lossPrice: undefined,
  costs: undefined,
  exitPrice: undefined,
  exitDate: undefined,
  notes: '',
  accountRisked: 0,
  plannedRR: 0,
  grossResult: 0,
  netResult: 0,
  accountChange: 0,
  accountBalance: 0,
};

interface EntryProps {
  journal: JournalModel;
  entry?: EntryModel;
  onSave: (entry: EntryModel | undefined) => void;
  onCancel: () => void;
}

const DetailField = ({
  value,
  text,
  label,
}: {
  value: number | undefined;
  text: string;
  label: string;
}) => {
  const color =
    value === null || value === undefined
      ? 'black'
      : value >= 0
      ? 'green'
      : 'red';
  return (
    <FormControl fullWidth>
      <TextField
        sx={{ input: { color: { color } } }}
        name={label}
        fullWidth
        id={label}
        label={label}
        value={text}
      />
    </FormControl>
  );
};

const Header = ({
  journal,
  finished,
  entry,
}: {
  journal: JournalModel;
  finished: boolean;
  entry?: EntryModel;
}) => {
  if (entry && entry.id) {
    return (
      <div>
        <Typography fontSize={20}>
          Edit {entry.type} {entry.symbol}
        </Typography>
        {finished && (
          <Typography>{entry.type} finished cannot be changed</Typography>
        )}
      </div>
    );
  } else {
    return (
      <Typography fontSize={20}>Add new entry to {journal.name}</Typography>
    );
  }
};

const isEntryFinished = (entry: any) => {
  return entry && entry.netResult;
};

export const Entry: React.FC<EntryProps> = (props: EntryProps) => {
  const { journal, entry: selectedEntry, onCancel, onSave } = props;
  const [entry, setEntry] = useState<EntryModel>(initialState);
  const [finished, setFinished] = useState<boolean>(false);
  const mutation = useEntrySave(journal.id);
  const [currency] = useState(getSymbol(journal.currentBalance.currency));

  useEffect(() => {
    if (selectedEntry) {
      setEntry(selectedEntry);
    }
    setFinished(isEntryFinished(selectedEntry));
  }, [selectedEntry]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(entry);
  };

  if (mutation.isSuccess) {
    onSave(mutation.data);
  }

  const handleCancel = () => {
    onCancel();
  };

  const isTrade = () => {
    return entry.type === EntryTypeEnum.TRADE;
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
      <Header journal={journal} finished={finished} entry={entry} />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <EntryTypeSelect
              key="entry-select"
              onChange={(value: EntryTypeEnum) =>
                setEntry({ ...entry, type: value })
              }
              entry={entry}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Datetime
                label="Entry date"
                required
                value={entry.date}
                onChange={(value) => setEntry({ ...entry, date: value! })}
              />
            </FormControl>
          </Grid>
        </Grid>

        {isTrade() && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  autoComplete="symbol"
                  name="symbol"
                  required
                  fullWidth
                  id="symbol"
                  label="Symbol"
                  autoFocus
                  value={entry.symbol}
                  onChange={(e) =>
                    setEntry({ ...entry, symbol: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DirectionSelect
                key="direction-select"
                onChange={(value: any) =>
                  setEntry({ ...entry, direction: value })
                }
                entry={entry}
              />
            </Grid>
          </Grid>
        )}

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={isTrade() ? 6 : 12}>
            <FormControl fullWidth>
              <NumberInput
                name="price"
                label={`Price (${currency})`}
                scale={2}
                value={entry.price}
                onChange={(value) => setEntry({ ...entry, price: value! })}
                {...{ required: true }}
              />
            </FormControl>
          </Grid>
          {isTrade() && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <NumberInput
                  name="size"
                  label="Entry Size"
                  scale={2}
                  value={entry.size}
                  zeroIsNull
                  onChange={(value) =>
                    setEntry({
                      ...entry,
                      size: value,
                    })
                  }
                  {...{ required: true }}
                />
              </FormControl>
            </Grid>
          )}
        </Grid>

        {isTrade() && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <NumberInput
                  name="profit"
                  label={`Profit Price (${currency})`}
                  scale={2}
                  value={entry.profitPrice}
                  onChange={(value) =>
                    setEntry({ ...entry, profitPrice: value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <NumberInput
                  name="loss"
                  label={`Loss Price (${currency})`}
                  scale={2}
                  value={entry.lossPrice}
                  onChange={(value) => setEntry({ ...entry, lossPrice: value })}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <NumberInput
                  name="costs"
                  label={`Costs Price (${currency})`}
                  scale={2}
                  value={entry.costs}
                  onChange={(value) => setEntry({ ...entry, costs: value })}
                />
              </FormControl>
            </Grid>
          </Grid>
        )}

        {isTrade() && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <NumberInput
                  name="exit-price"
                  label={`Exit Price (${currency})`}
                  scale={2}
                  value={entry.exitPrice}
                  onChange={(value) =>
                    setEntry({
                      ...entry,
                      exitPrice: value === 0 ? undefined : value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Datetime
                  required={false}
                  label="Exit date"
                  value={entry.exitDate}
                  onChange={(value) => setEntry({ ...entry, exitDate: value! })}
                />
              </FormControl>
            </Grid>
          </Grid>
        )}

        {isTrade() && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <GraphTypeSelect
                key="graph-type-select"
                onChange={(value: any) =>
                  setEntry({ ...entry, graphType: value })
                }
                entry={entry}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  autoComplete="graph-measure"
                  name="graph-measure"
                  fullWidth
                  id="graph-measure"
                  label="Graph Measure"
                  value={entry.graphMeasure}
                  onChange={(e) =>
                    setEntry({ ...entry, graphMeasure: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        )}

        {isTrade() && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <TextField
                  autoComplete="notes"
                  name="notes"
                  fullWidth
                  id="notes"
                  label="Notes"
                  value={entry.notes}
                  onChange={(e) =>
                    setEntry({ ...entry, notes: e.target.value })
                  }
                  multiline
                  maxRows={4}
                />
              </FormControl>
            </Grid>
          </Grid>
        )}

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12}>
            <Accordion variant="outlined">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Result</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {isTrade() && (
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name="accountRisked"
                          fullWidth
                          id="accountRisked"
                          label="Account Risked"
                          value={percentFormatter(entry.accountRisked)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name="plannedRR"
                          fullWidth
                          id="plannedRR"
                          label="Planned RR"
                          value={entry.plannedRR}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                )}

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {isTrade() && (
                    <Grid item xs={12} sm={6}>
                      <DetailField
                        value={entry.grossResult}
                        text={currencyFormatter(entry.grossResult)}
                        label={`Gross Result (${currency})`}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <DetailField
                      value={entry.netResult}
                      text={currencyFormatter(entry.netResult)}
                      label={`Net Result (${currency})`}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <DetailField
                      value={entry.accountChange}
                      text={percentFormatter(entry.accountChange)}
                      label="Account Changed"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailField
                      value={entry.accountBalance}
                      text={currencyFormatter(entry.accountBalance)}
                      label={`Account Balance (${currency})`}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
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
              {...(finished && { disabled: true })}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
