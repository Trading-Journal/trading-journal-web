import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { EntryModel } from '../../model/EntryModel';
import { JournalModel } from '../../model/JournalModel';
import { Uploader } from '../uploader/Uploader';

interface ImageProps {
  journal: JournalModel;
  entry: EntryModel;
  onCancel: () => void;
}

const Header = ({ entry }: { entry: EntryModel }) => {
  return (
    <Typography fontSize={20}>
      Upload Images for {entry.type} {entry.symbol}
    </Typography>
  );
};

export const EntryImages: React.FC<ImageProps> = (props: ImageProps) => {
  const { journal, entry, onCancel } = props;

  const center = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: 2,
  };

  const imageBefore = {
    url: `http://localhost:8081/entries/${journal.id}/${entry.id}/image`,
    paramName: 'file  ',
    params: { type: 'IMAGE_BEFORE' },
  };

  const imageAfter = {
    url: `http://localhost:8081/entries/${journal.id}/${entry.id}/image`,
    paramName: 'file  ',
    params: { type: 'IMAGE_AFTER' },
  };

  const handleClose = () => {
    onCancel();
  };

  console.log(entry);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Header entry={entry} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography fontSize={15} sx={center}>
            Upload an image for the moment you started the trade
          </Typography>
          <Uploader {...imageBefore} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography fontSize={15} sx={center}>
            Upload an image for the moment you ended the trade
          </Typography>
          <Uploader {...imageAfter} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClose}
          >
            Done
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
