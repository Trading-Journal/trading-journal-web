import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useAccessTokenState } from '../../context/UserContext';
import { EntryImageResponse } from '../../model/EntryImageResponse';
import { EntryModel } from '../../model/EntryModel';
import { JournalModel } from '../../model/JournalModel';
import { UploadTypeEnum } from '../../model/UploadTypeEnum';
import { getEntryImage } from '../../services/EntryService';
import { Uploader } from '../uploader/Uploader';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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

const SubHeader = () => {
  return (
    <Typography fontSize={15} marginTop={3}>
      You can upload two images: one for when you started and one when you
      finished the trade
    </Typography>
  );
};

const PreviewContainer = styled('div')`
  img {
    max-width: 260px;
    max-height: 260px;
  }
`;

export const EntryImages: React.FC<ImageProps> = (props: ImageProps) => {
  const { journal, entry, onCancel } = props;

  const [imageBefore, setImageBefore] = useState<string | undefined>('');
  const [imageAfter, setImageAfter] = useState<string | undefined>('');
  const [hasAnyImage, setHasAnyImage] = useState<boolean>(false);

  const accessToken = useAccessTokenState();

  useEffect(() => {
    getEntryImage(
      accessToken,
      journal.id,
      entry,
      UploadTypeEnum.IMAGE_BEFORE
    ).then((resp: EntryImageResponse) => setImageBefore(resp.image));
    getEntryImage(
      accessToken,
      journal.id,
      entry,
      UploadTypeEnum.IMAGE_AFTER
    ).then((resp: EntryImageResponse) => setImageAfter(resp.image));
  }, [journal, entry, accessToken]);

  useEffect(() => {
    if (imageBefore || imageAfter) {
      setHasAnyImage(true);
    }
  }, [imageBefore, imageAfter]);

  const center = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: 2,
  };

  const imageBeforeRequest = {
    url: `http://localhost:8081/entries/${journal.id}/${entry.id}/image`,
    paramName: 'file  ',
    params: { type: 'IMAGE_BEFORE' },
  };

  const imageAfterRequest = {
    url: `http://localhost:8081/entries/${journal.id}/${entry.id}/image`,
    paramName: 'file  ',
    params: { type: 'IMAGE_AFTER' },
  };

  const handleClose = () => {
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
      <Header entry={entry} />

      {hasAnyImage && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold" fontSize={15} sx={center}>
              Start Trade
            </Typography>
            {imageBefore && (
              <PreviewContainer>
                <img
                  src={`data:image/png;base64,${imageBefore}`}
                  alt="Trade Before"
                />
              </PreviewContainer>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold" fontSize={15} sx={center}>
              Finish Trade
            </Typography>
            {imageAfter && (
              <PreviewContainer>
                <img
                  src={`data:image/png;base64,${imageAfter}`}
                  alt="Trade After"
                />
              </PreviewContainer>
            )}
          </Grid>
        </Grid>
      )}

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <SubHeader />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight="bold" fontSize={15} sx={center}>
                Start Trade
              </Typography>
              <Uploader {...imageBeforeRequest} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight="bold" fontSize={15} sx={center}>
                Finish Trade
              </Typography>
              <Uploader {...imageAfterRequest} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Button
            variant="outlined"
            fullWidth
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
