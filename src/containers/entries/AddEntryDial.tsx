import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { EntryType } from 'model';

export const AddEntryDial = ({
  onSelect,
}: {
  onSelect: (type: EntryType) => void;
}) => {
  const style = {
    bgcolor: 'primary.main',
    '&:hover': {
      bgcolor: 'primary.dark',
    },
    color: 'white',
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial add entry"
      sx={{ position: 'absolute', bottom: 50, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        tooltipOpen
        key="Trade"
        tooltipTitle="Trade"
        onClick={() => onSelect(EntryType.TRADE)}
        icon={<TrendingUpIcon />}
        FabProps={{
          sx: style,
        }}
      />
      <SpeedDialAction
        tooltipOpen
        key="Deposit"
        tooltipTitle="Deposit"
        onClick={() => onSelect(EntryType.DEPOSIT)}
        icon={<SavingsIcon />}
        FabProps={{
          sx: style,
        }}
      />
      <SpeedDialAction
        tooltipOpen
        key="Withdrawal"
        tooltipTitle="Withdrawal"
        onClick={() => onSelect(EntryType.WITHDRAWAL)}
        icon={<CurrencyExchangeIcon />}
        FabProps={{
          sx: style,
        }}
      />
      <SpeedDialAction
        tooltipOpen
        key="Taxes"
        tooltipTitle="Taxes"
        onClick={() => onSelect(EntryType.TAXES)}
        icon={<AccountBalanceIcon />}
        FabProps={{
          sx: style,
        }}
      />
    </SpeedDial>
  );
};
