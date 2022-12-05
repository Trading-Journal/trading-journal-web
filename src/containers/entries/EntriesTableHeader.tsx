import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddIcon from '@mui/icons-material/Add';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SavingsIcon from '@mui/icons-material/Savings';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { Dropdown } from 'components/input';
import { EntryType } from 'model';
import React, { useState } from 'react';

export const EntriesTableHeader = ({
  filterChanged,
  addSelected,
}: {
  filterChanged: (type: EntryType | string) => void;
  addSelected: (type: EntryType) => void;
}) => {
  const types = [
    {
      key: 'ALL',
      value: 'All',
      icon: <StarOutlineIcon />,
    },
    {
      key: EntryType.TRADE,
      value: 'Trade',
      icon: <TrendingUpIcon />,
    },
    {
      key: EntryType.DEPOSIT,
      value: 'Deposit',
      icon: <SavingsIcon />,
    },
    {
      key: EntryType.WITHDRAWAL,
      value: 'Withdrawal',
      icon: <CurrencyExchangeIcon />,
    },
    {
      key: EntryType.TAXES,
      value: 'Taxes',
      icon: <AccountBalanceIcon />,
    },
  ];

  const dropDownItems = types.map((type) => ({
    key: type.key,
    value: type.value,
  }));

  const [type, setType] = useState<EntryType | string>('ALL');
  const changeFilter = (type: EntryType | string) => {
    setType(type);
    filterChanged(type);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <GridToolbarContainer>
      <Box sx={{ flexGrow: 1, p: 1, display: { xs: 'none', md: 'flex' } }}>
        <ToggleButtonGroup
          value={type}
          onChange={(e, value) => changeFilter(value)}
          exclusive
          color="primary"
          size="small"
        >
          {types.map((type) => (
            <ToggleButton value={type.key} key={type.key}>
              {React.cloneElement(type.icon, {
                color: 'primary',
                fontSize: 'small',
              })}
              <Typography sx={{ ml: 1 }} color="primary" variant="body2">
                {type.value}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ flexGrow: 1, p: 1, display: { xs: 'flex', md: 'none' } }}>
        <Dropdown
          id="filter-types"
          label="Entry Type"
          items={dropDownItems}
          onChange={(value) => changeFilter(value.key)}
          selected={dropDownItems.find((x) => x.key === type)}
          width={150}
          small
        />
      </Box>
      <>
        <Button
          sx={{ mr: { xs: '0', md: '2' } }}
          startIcon={<AddIcon />}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="outlined"
        >
          Add Entry
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {types
            .filter((type) => type.key !== 'ALL')
            .map((type, index) => (
              <MenuItem
                onClick={() => addSelected(type.key as EntryType)}
                key={`header-menuitem-grid-${index}`}
              >
                <ListItemIcon key={`header-listitem-grid-${index}`}>
                  {React.cloneElement(type.icon, {
                    color: 'primary',
                    fontSize: 'small',
                    key: `header-icon-grid-${index}`,
                  })}
                </ListItemIcon>
                <ListItemText key={`header-itemText-grid-${index}`}>
                  {' '}
                  {type.value}
                </ListItemText>
              </MenuItem>
            ))}
        </Menu>
      </>
    </GridToolbarContainer>
  );
};
