import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { EntryModel } from '../../model/EntryModel';
import { JournalModel } from '../../model/JournalModel';

interface EntryProps {
  journal: JournalModel;
  entry?: EntryModel;
  onSave: (entry: EntryModel | undefined) => void;
  onCancel: () => void;
}

function renderHeader(journal: JournalModel, entry?: EntryModel) {
  if (entry) {
    return (
      <Typography fontSize={20}>
        Edit {entry.type} {entry.symbol}
      </Typography>
    );
  } else {
    return (
      <Typography fontSize={20}>Add new entry to {journal.name}</Typography>
    );
  }
}

export const Entry: React.FC<EntryProps> = (props: EntryProps) => {
  const { journal, entry, onSave, onCancel } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(entry);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {renderHeader(journal, entry)}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={false}
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </LoadingButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
