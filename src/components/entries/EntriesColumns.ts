import { GridColDef } from '@mui/x-data-grid';
import {
  formatCellValue,
  formatCurrency,
  formatDate,
  formatPercentage,
} from './EntriesFormat';

export const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Date',
    width: 155,
    valueFormatter: formatDate,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 115,
  },
  {
    field: 'symbol',
    headerName: 'Symbol',
    width: 115,
  },
  {
    field: 'direction',
    headerName: 'Direction',
    width: 90,
  },
  {
    field: 'price',
    headerName: 'Entry Price',
    type: 'number',
    width: 130,
    valueFormatter: formatCurrency,
  },
  {
    field: 'size',
    headerName: 'Entry Size',
    type: 'number',
    width: 115,
    valueFormatter: (params) => formatCurrency(params, false),
  },
  {
    field: 'profitPrice',
    headerName: 'Profit',
    type: 'number',
    width: 130,
    valueFormatter: formatCurrency,
  },
  {
    field: 'lossPrice',
    headerName: 'Loss',
    type: 'number',
    width: 130,
    valueFormatter: formatCurrency,
  },
  {
    field: 'costs',
    headerName: 'Costs',
    type: 'number',
    width: 100,
    valueFormatter: formatCurrency,
  },
  {
    field: 'exitPrice',
    headerName: 'Exit Price',
    type: 'number',
    width: 130,
    valueFormatter: formatCurrency,
  },
  {
    field: 'exitDate',
    headerName: 'Exit Date',
    width: 155,
    valueFormatter: formatDate,
  },
  {
    field: 'accountRisked',
    headerName: 'Account Risked',
    type: 'number',
    width: 130,
    valueFormatter: formatPercentage,
    headerClassName: 'super-app-calculated',
  },

  {
    field: 'plannedRR',
    headerName: 'RR',
    type: 'number',
    valueFormatter: (params) => formatCurrency(params, false),
    headerClassName: 'super-app-calculated',
  },
  {
    field: 'grossResult',
    headerName: 'Gross Result',
    type: 'number',
    width: 130,
    valueFormatter: formatCurrency,
    headerClassName: 'super-app-calculated',
  },
  {
    field: 'netResult',
    headerName: 'Net Result',
    type: 'number',
    width: 130,
    valueFormatter: formatCurrency,
    headerClassName: 'super-app-calculated',
    cellClassName: formatCellValue,
  },
  {
    field: 'accountChange',
    headerName: 'Account Change',
    type: 'number',
    width: 130,
    valueFormatter: formatPercentage,
    headerClassName: 'super-app-calculated',
    cellClassName: formatCellValue,
  },
  {
    field: 'accountBalance',
    headerName: 'Account Balance',
    type: 'number',
    width: 130,
    valueFormatter: formatCurrency,
    headerClassName: 'super-app-calculated',
    cellClassName: formatCellValue,
  },
  {
    field: 'graphType',
    headerName: 'Graph',
    width: 130,
    renderCell: (params) => {
      if (params.row.graphType) {
        return `${params.row.graphType}(${params.row.graphMeasure})`;
      } else {
        return '';
      }
    },
  },
  {
    field: 'screenshotBefore',
    headerName: 'Image Before',
    width: 150,
  },
  {
    field: 'screenshotAfter',
    headerName: 'Image After',
    width: 150,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 150,
  },
];
