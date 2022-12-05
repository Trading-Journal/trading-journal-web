import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GridFooter, GridFooterContainer } from '@mui/x-data-grid';
import { Currency, Entry } from 'model';
import { useEffect, useState } from 'react';
import { currencyFormatter, percentFormatter } from 'utilities';

export const EntriesTableFooter = ({
  entries,
  currency,
}: {
  entries: Entry[];
  currency: Currency;
}) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const totals = entries.reduce(
      (totals, entry) => {
        totals.result += entry.netResult ?? 0;
        totals.costs += entry.costs ?? 0;
        totals.change += entry.accountChange ?? 0;

        return totals;
      },
      { result: 0, costs: 0, change: 0 }
    );

    setItems([
      {
        label: 'Net Result',
        value: totals.result,
        valueString: currencyFormatter(totals.result, currency),
      },
      {
        label: 'Costs',
        value: totals.costs,
        valueString: currencyFormatter(totals.costs, currency),
      },
      {
        label: 'Account Changed',
        value: totals.change,
        valueString: percentFormatter(totals.change),
      },
    ]);
  }, [entries, currency]);

  return (
    <GridFooterContainer>
      <Box sx={{ flexGrow: 1, p: 1, display: 'flex' }}>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid item xs={12} md={4} key={`footer-grid-${index}`}>
              <Stack
                direction="column"
                alignItems="center"
                key={`footer-stack-${index}`}
              >
                <Chip
                  key={`footer-chip-${index}`}
                  size="small"
                  sx={{ fontSize: '0.9rem' }}
                  label={item.valueString}
                  color={item.value >= 0 ? 'success' : 'error'}
                />
                <Typography fontSize={12} key={`footer-label-${index}`}>
                  {item.label}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
      <GridFooter />
    </GridFooterContainer>
  );
};
