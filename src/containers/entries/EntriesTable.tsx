import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import { Box } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import { useConfirmationModalContext } from 'components/dialog/ConfirmationDialog';
import { Entry, EntryType, Journal } from 'model';
import { useEntryDelete } from 'queries';
import { useCallback, useMemo, useState } from 'react';
import {
  displayFormat,
  formatCellValue,
  formatCurrency,
  formatDate,
  formatPercentage,
} from 'utilities';
import { EntriesTableFooter } from './EntriesTableFooter';
import { EntriesTableHeader } from './EntriesTableHeader';

export const EntriesTable = ({
  entries,
  journal,
  onEdit,
  onImage,
  onAdd,
}: {
  entries: Entry[];
  journal: Journal;
  onEdit: (entry: Entry) => void;
  onImage: (entry: Entry) => void;
  onAdd: (type: EntryType) => void;
}) => {
  const currency = journal.currency;
  const modalContext = useConfirmationModalContext();
  const deleteMutation = useEntryDelete(journal.id);

  const [data, setData] = useState(entries);

  const filterChanged = (type: EntryType | string) => {
    if (type === 'ALL') {
      setData(entries);
    } else {
      setData(entries.filter((entry: Entry) => entry.type === type));
    }
  };

  const deleteClick = useCallback(
    async (entry: Entry) => {
      const result = await modalContext.showConfirmation(
        'Delete entry',
        `Are you sure do you want to remove ${entry.type} ${
          entry.symbol ? entry.symbol : ''
        } added on ${displayFormat(entry.date)}?`
      );
      if (result) {
        deleteMutation.mutate(entry);
      }
    },
    [deleteMutation, modalContext]
  );

  const columns = useMemo<GridColumns<Entry>>(
    () => [
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (params: any) => [
          <GridActionsCellItem
            sx={{
              display: params.row.type === EntryType.TRADE ? 'block' : 'none',
            }}
            icon={
              <Tooltip title={`Edit ${params.row.type}`}>
                <EditIcon color="primary" />
              </Tooltip>
            }
            onClick={() => onEdit(params.row)}
            label="Edit"
            key={`edit-${params.row.id}`}
            showInMenu
          />,
          <GridActionsCellItem
            sx={{
              display: params.row.type === EntryType.TRADE ? 'block' : 'none',
            }}
            icon={
              <Tooltip title="Add or Edit Images">
                <ImageIcon color="primary" />
              </Tooltip>
            }
            onClick={() => onImage(params.row)}
            label="Images"
            key={`images-${params.row.id}`}
            showInMenu
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title={`Delete ${params.row.type}`}>
                <DeleteIcon color="primary" />
              </Tooltip>
            }
            onClick={() => deleteClick(params.row)}
            label="Delete"
            key={`delete-${params.row.id}`}
            showInMenu
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
        cellClassName: formatCellValue,
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
    ],
    [currency, deleteClick, onEdit, onImage]
  );

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
      <DataGrid
        autoHeight
        rows={data}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        disableSelectionOnClick
        disableColumnMenu
        components={{
          Toolbar: EntriesTableHeader,
          Footer: EntriesTableFooter,
        }}
        componentsProps={{
          toolbar: { filterChanged: filterChanged, addSelected: onAdd },
          footer: { entries: data, currency: currency },
        }}
      />
    </Box>
  );
};
