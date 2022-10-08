import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { EntryModel } from '../../model/EntryModel';
import { columns } from './EntriesColumns';

export const Entries = (props: any) => {
  const [entries, setEntries] = useState<EntryModel[]>([]);

  useEffect(() => {
    setEntries(props.entries);
  }, [props]);

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
        autoHeight={true}
        rows={entries}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        disableSelectionOnClick
      />
    </Box>
  );
};
