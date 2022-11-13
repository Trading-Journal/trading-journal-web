import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { asUploadButton } from '@rpldy/upload-button';
import UploadDropZone from '@rpldy/upload-drop-zone';
import withPasteUpload from '@rpldy/upload-paste';
import UploadPreview from '@rpldy/upload-preview';
import Uploady, {
  useItemErrorListener,
  useItemFinishListener,
  useItemProgressListener,
  useItemStartListener,
} from '@rpldy/uploady';
import React, { forwardRef, useEffect, useState } from 'react';
import { useAccessTokenState } from '../../context/UserContext';
import { AlertCard } from '../card/AlertCard';
import { SimpleCard } from '../card/SimpleCard';

enum Status {
  NONE,
  UPLOADING,
  SUCCESS,
  ERROR,
}

interface UploadStatus {
  status: Status;
  message: string;
}

const PreviewContainer = styled('div')`
  img {
    max-width: 260px;
    max-height: 260px;
  }
`;

const PasteUploadDropZone = withPasteUpload(UploadDropZone);
const SimpleContainer = styled('div')``;
const PasteArea = withPasteUpload(SimpleContainer);

interface UploadProps {
  url: string;
  paramName: string;
  params?: Record<string, string> | undefined;
  preview?: boolean;
  onFinish?: () => void;
}

const ButtonAsUploadButton = asUploadButton(
  forwardRef((props: any, ref: any) => {
    return (
      <Button fullWidth variant="contained" ref={ref} {...props}>
        Or click here to upload
      </Button>
    );
  })
);

export const Uploader: React.FC<UploadProps> = (props: UploadProps) => {
  const { url, paramName, params, onFinish, preview } = props;
  const center = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: 2,
  };

  const accessToken = useAccessTokenState();
  const destination = {
    url,
    filesParamName: paramName,
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    params,
  };

  const [status, setStatus] = useState<UploadStatus>({
    status: Status.NONE,
    message: '',
  });

  useEffect(() => {
    if (status.status === Status.SUCCESS && onFinish) {
      onFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const UploadStatusView = () => {
    useItemStartListener(() =>
      setStatus({
        status: Status.UPLOADING,
        message: 'Uploading',
      })
    );
    useItemFinishListener(() =>
      setStatus({
        status: Status.SUCCESS,
        message: 'Successfully Uploaded',
      })
    );
    useItemProgressListener((item: any) =>
      setStatus({
        status: Status.UPLOADING,
        message: `item is ${item.completed}% done and ${item.loaded} bytes uploaded`,
      })
    );

    useItemErrorListener((item: any) => {
      setStatus({
        status: Status.ERROR,
        message: `Failed to upload\n${item.uploadResponse.data.error}`,
      });
    });

    if (status.status === Status.NONE) {
      return <label></label>;
    }

    const severity =
      status.status === Status.SUCCESS
        ? 'success'
        : status.status === Status.UPLOADING
        ? 'info'
        : 'error';

    return (
      <AlertCard
        show={true}
        message={status.message}
        severity={severity}
      ></AlertCard>
    );
  };

  return (
    <Box sx={center}>
      <Uploady
        multiple={false}
        destination={destination}
        accept=".png,.jpg,.jpeg"
      >
        <Stack spacing={2}>
          <PasteUploadDropZone autoUpload={true} params={{ test: 'paste' }}>
            <PasteArea autoUpload={true}>
              <SimpleCard title="Upload">
                <Typography fontSize={15} sx={center}>
                  You can drop a file here
                </Typography>
                <Typography fontSize={15} sx={center}>
                  Or click and paste a file to upload
                </Typography>
              </SimpleCard>
            </PasteArea>
          </PasteUploadDropZone>
          <ButtonAsUploadButton />
          <UploadStatusView />
          {preview && (
            <PreviewContainer>
              <UploadPreview />
            </PreviewContainer>
          )}
        </Stack>
      </Uploady>
    </Box>
  );
};
