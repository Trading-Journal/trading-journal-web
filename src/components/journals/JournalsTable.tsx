import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { Journal } from '../../model/Journal';
import { displayFormatDate } from '../../util/DateFormat';
import { currencyFormatter, getSymbol } from '../../util/NumberFormat';
import { useConfirmationModalContext } from '../dialog/ConfirmationDialog';
import { useJournalDelete } from '../queries/JournalQueries';

export const JournalsTable = ({
  journals,
  onEdit,
}: {
  journals: Journal[];
  onEdit: (journal: Journal) => void;
}) => {
  const modalContext = useConfirmationModalContext();
  const deleteMutation = useJournalDelete();

  const deleteClick = async (journal: Journal) => {
    const result = await modalContext.showConfirmation(
      'Delete Journal',
      <>
        <Typography fontSize={20}>
          Are you sure do you want to remove {journal.name}?
        </Typography>
        <Typography fontSize={14}>
          All entries for this journal will also be delete.
        </Typography>
        <Typography fontSize={14}>This action can not be undone</Typography>
      </>
    );
    if (result) {
      deleteMutation.mutate(journal.id);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      renderCell: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Edit Journal">
              <EditIcon color="primary" />
            </Tooltip>
          }
          onClick={() => onEdit(params.row)}
          label="Edit"
          key={`edit-${params.row.id}`}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete Journal">
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
      field: 'name',
      headerName: 'Name',
      width: 250,
    },
    {
      field: 'startBalance',
      headerName: 'Start Balance',
      type: 'number',
      width: 150,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) =>
        currencyFormatter(params.row.startBalance, {
          symbol: getSymbol(params.row.currency),
        }),
    },
    {
      field: 'startJournal',
      headerName: 'Start Journal',
      headerAlign: 'right',
      align: 'right',
      width: 150,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) =>
        displayFormatDate(params.row.startJournal),
    },
    {
      field: 'currency',
      headerName: 'Currency',
      headerAlign: 'right',
      align: 'right',
      width: 110,
      sortable: false,
    },
  ];

  return (
    <DataGrid
      autoHeight={true}
      rows={journals}
      columns={columns}
      pageSize={100}
      rowsPerPageOptions={[100]}
      disableSelectionOnClick
    />
  );
};
