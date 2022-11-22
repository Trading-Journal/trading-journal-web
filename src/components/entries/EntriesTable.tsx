import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { EntryModel } from '../../model/EntryModel';
import { EntryType } from '../../model/EntryType';
import { Journal } from '../../model/Journal';
import {
  formatCellValue,
  formatCurrency,
  formatDate,
  formatPercentage,
} from '../../util/DataGridFormat';
import { displayFormat } from '../../util/DateFormat';
import { getSymbol } from '../../util/NumberFormat';
import { useConfirmationModalContext } from '../dialog/ConfirmationDialog';
import { useEntryDelete } from '../queries/EntriesQueries';
import { SidePanel } from '../side-panel/SidePanel';
import { Entry } from './Entry';
import { EntryImages } from './EntryImages';

export const EntriesTable: React.FC<{
  entries: EntryModel[];
  journal: Journal;
}> = ({ entries, journal }) => {
  const [entry, setEntry] = useState<EntryModel>();
  const [entryOpen, setEntryOpen] = useState(false);
  const [imagesOpen, setImagesOpen] = useState(false);
  const [currency] = useState(getSymbol(journal.currentBalance.currency));

  const modalContext = useConfirmationModalContext();
  const deleteMutation = useEntryDelete(journal.id);

  const onClose = () => {
    setEntryOpen(false);
    setImagesOpen(false);
  };

  const onSave = () => {
    setEntryOpen(false);
  };

  const addClick = () => {
    setEntry(undefined);
    setEntryOpen(true);
  };

  const editClick = (entry: EntryModel) => {
    setEntry(entry);
    setEntryOpen(true);
  };

  const imagesClick = (entry: EntryModel) => {
    setEntry(entry);
    setImagesOpen(true);
  };

  const deleteClick = async (entry: EntryModel) => {
    const result = await modalContext.showConfirmation(
      'Delete entry',
      `Are you sure do you want to remove ${entry.type} ${
        entry.symbol ? entry.symbol : ''
      } added on ${displayFormat(entry.date)}?`
    );
    if (result) {
      deleteMutation.mutate(entry);
    }
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
          icon={
            <Tooltip title="Edit Entry">
              <EditIcon color="primary" />
            </Tooltip>
          }
          onClick={() => editClick(params.row)}
          label="Edit"
          key={`edit-${params.row.id}`}
        />,
        <GridActionsCellItem
          sx={{
            visibility:
              params.row.type === EntryType.TRADE ? 'visible' : 'collapse',
          }}
          icon={
            <Tooltip title="Add or Edit Images">
              <ImageIcon color="primary" />
            </Tooltip>
          }
          onClick={() => imagesClick(params.row)}
          label="Images"
          key={`images-${params.row.id}`}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete Entry">
              <DeleteIcon color="primary" />
            </Tooltip>
          }
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
      valueFormatter: (params) => formatCurrency(params, currency),
    },
    {
      field: 'size',
      headerName: 'Entry Size',
      type: 'number',
      width: 115,
      valueFormatter: formatCurrency,
    },
    {
      field: 'profitPrice',
      headerName: 'Profit',
      type: 'number',
      width: 130,
      valueFormatter: (params) => formatCurrency(params, currency),
    },
    {
      field: 'lossPrice',
      headerName: 'Loss',
      type: 'number',
      width: 130,
      valueFormatter: (params) => formatCurrency(params, currency),
    },
    {
      field: 'costs',
      headerName: 'Costs',
      type: 'number',
      width: 100,
      valueFormatter: (params) => formatCurrency(params, currency),
    },
    {
      field: 'exitPrice',
      headerName: 'Exit Price',
      type: 'number',
      width: 130,
      valueFormatter: (params) => formatCurrency(params, currency),
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
      valueFormatter: formatCurrency,
      headerClassName: 'super-app-calculated',
    },
    {
      field: 'grossResult',
      headerName: 'Gross Result',
      type: 'number',
      width: 130,
      valueFormatter: (params) => formatCurrency(params, currency),
      headerClassName: 'super-app-calculated',
    },
    {
      field: 'netResult',
      headerName: 'Net Result',
      type: 'number',
      width: 130,
      valueFormatter: (params) => formatCurrency(params, currency),
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
      valueFormatter: (params) => formatCurrency(params, currency),
      headerClassName: 'super-app-calculated',
      cellClassName: formatCellValue,
    },
    {
      field: 'graphType',
      headerName: 'Graph',
      width: 150,
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
      <SidePanel open={entryOpen} onClose={onClose}>
        <Entry
          journal={journal}
          entry={entry}
          onCancel={onClose}
          onSave={onSave}
        />
      </SidePanel>

      <SidePanel open={imagesOpen} onClose={onClose}>
        <EntryImages journal={journal} entry={entry!} onCancel={onClose} />
      </SidePanel>

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
