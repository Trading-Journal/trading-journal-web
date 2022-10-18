import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { EntryModel } from '../../model/EntryModel';
import { JournalModel } from '../../model/JournalModel';
import { dateFormat } from '../../util/DateFormat';
import { useConfirmationModalContext } from '../dialog/ConfirmationDialog';
import { ContentDialog } from '../dialog/ContentDialog';

import {
  formatCellValue,
  formatCurrency,
  formatDate,
  formatPercentage,
} from './EntriesFormat';
import { Entry } from './Entry';

export const Entries: React.FC<{
  entries: EntryModel[];
  journal: JournalModel;
}> = ({ entries, journal }) => {
  const [entry, setEntry] = useState<EntryModel>();
  const [formOpen, setFormOpen] = useState(false);

  const EntryDialog = ContentDialog(Entry);
  const modalContext = useConfirmationModalContext();

  const onCancel = () => {
    setFormOpen(false);
  };

  const onSave = (entry: EntryModel) => {
    console.log(entry);
    setFormOpen(false);
  };

  const addClick = () => {
    setEntry(undefined);
    setFormOpen(true);
  };

  const editClick = (entry: EntryModel) => {
    setEntry(entry);
    setFormOpen(true);
  };

  const deleteClick = async (entry: EntryModel) => {
    const result = await modalContext.showConfirmation(
      'Delete entry',
      `Are you sure do you want to remove ${entry.type} ${
        entry.symbol ? entry.symbol : ''
      } added on ${dateFormat(entry.date)}?`
    );
    console.log('Result is :' + result);
  };

  function CustomFooter() {
    return (
      <Box sx={{ p: 1, display: 'flex' }}>
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addClick}
        >
          Add Trade
        </Button>
      </Box>
    );
  }

  const columns: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      renderCell: (params) => [
        <GridActionsCellItem
          color="primary"
          icon={<EditIcon />}
          onClick={() => editClick(params.row)}
          label="Edit"
          key={`edit-${params.row.id}`}
        />,
        <GridActionsCellItem
          color="primary"
          icon={<DeleteIcon />}
          onClick={() => deleteClick(params.row)}
          label="Delete"
          key={`delete-${params.row.id}`}
        />,
      ],
    },
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

  return (
    <Box
      sx={{
        width: '100%',
        '& .super-app-calculated': {
          backgroundColor: 'rgba(72, 70, 67, 0.058)',
        },
        '& .super-app.negative': {
          color: '#d47483',
          fontWeight: '600',
        },
        '& .super-app.positive': {
          color: 'rgba(42, 139, 4, 0.864)',
          fontWeight: '600',
        },
      }}
    >
      <EntryDialog
        open={formOpen}
        journal={journal}
        entry={entry}
        onCancel={onCancel}
        onSave={onSave}
      />
      <DataGrid
        autoHeight={true}
        rows={entries}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        disableSelectionOnClick
        components={{
          Footer: CustomFooter,
        }}
      />
    </Box>
  );
};
