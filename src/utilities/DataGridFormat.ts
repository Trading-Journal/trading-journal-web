import { GridCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import clsx from 'clsx';
import { Currency } from './../model/Currency';
import { displayFormat } from './DateFormat';
import {
  currencyFormat,
  currencyFormatter,
  percentFormatter,
} from './NumberFormat';

export const formatCurrency = (
  params: GridValueFormatterParams<number>,
  currency?: Currency
) => {
  if (params.value == null) {
    return '';
  }
  var valueFormatted = '';
  if (currency) {
    valueFormatted = currencyFormatter(params.value, currency);
  } else {
    valueFormatted = currencyFormat(params.value);
  }
  return `${valueFormatted}`;
};

export const formatPercentage = (params: GridValueFormatterParams<number>) => {
  return percentFormatter(params.value);
};

export const formatDate = (params: GridValueFormatterParams<Date>) => {
  if (params.value == null) {
    return '';
  }
  const valueFormatted = displayFormat(params.value);
  return `${valueFormatted}`;
};

export const formatCellValue = (params: GridCellParams<number>) => {
  if (params.value == null) {
    return '';
  }

  return clsx('super-app', {
    negative: params.value < 0,
    positive: params.value >= 0,
    calculated: params.value === 0 || params.value === null,
  });
};
