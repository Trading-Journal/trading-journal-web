import { GridCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import clsx from 'clsx';
import { currencyFormatter } from '../../util/NumberFormat';
import { displayFormat } from './../../util/DateFormat';

export const formatCurrency = (
  params: GridValueFormatterParams<number>,
  withSymbol: boolean = true
) => {
  if (params.value == null) {
    return '';
  }
  var valueFormatted = '';
  if (withSymbol) {
    valueFormatted = currencyFormatter(params.value);
  } else {
    valueFormatted = currencyFormatter(params.value, { symbol: '' });
  }
  return `${valueFormatted}`;
};

export const formatPercentage = (params: GridValueFormatterParams<number>) => {
  if (params.value == null) {
    return '';
  }
  const valueFormatted = currencyFormatter(params.value * 100);
  return `${valueFormatted} %`;
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
