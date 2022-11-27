import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import { useState } from 'react';
import { Journal } from '../../model';
import { Loading } from '../loading/Loading';
import { useJournalsQuery } from '../queries';
import { SidePanel } from '../side-panel/SidePanel';
import { JournalForm } from './JournalForm';
import { JournalsTable } from './JournalsTable';

export const Journals = () => {
  const JournalsLoading = Loading(JournalsTable);
  const { data, error, isLoading } = useJournalsQuery();
  const [open, setOpen] = useState(false);
  const [journal, setJournal] = useState<Journal>();

  const onEdit = (journal: Journal) => {
    setJournal(journal);
    setOpen(true);
  };

  const onClose = () => {
    setJournal(undefined);
    setOpen(false);
  };

  const onSave = () => {
    setJournal(undefined);
    setOpen(false);
  };

  const addClick = () => {
    setJournal(undefined);
    setOpen(true);
  };

  return (
    <Box sx={{ p: 2, flexGrow: 1, width: '100%' }}>
      <JournalsLoading
        isLoading={isLoading}
        error={error}
        journals={data}
        onEdit={onEdit}
      />
      <SidePanel open={open} onClose={onClose}>
        <JournalForm journal={journal} onCancel={onClose} onSave={onSave} />
      </SidePanel>
      <Fab
        color="primary"
        aria-label="add"
        onClick={addClick}
        sx={{ position: 'absolute', bottom: 50, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};
