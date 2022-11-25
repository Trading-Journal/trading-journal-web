import Grid from '@mui/material/Grid';
import React from 'react';
import { CancelButton } from './CancelButton';
import { SubmitButton } from './SubmitButton';

interface FormButtonsProps {
  loading: boolean;
  handleCancel: () => void;
  submitChildren?: React.ReactNode;
  cancelChildren?: React.ReactNode;
  submitDisabled?: boolean;
}

export const FormButtons: React.FC<FormButtonsProps> = ({
  loading,
  handleCancel,
  submitChildren = undefined,
  cancelChildren = undefined,
  submitDisabled = false,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <CancelButton onClick={handleCancel}>
          {cancelChildren && cancelChildren}
        </CancelButton>
      </Grid>
      <Grid item xs={12} sm={6}>
        <SubmitButton loading={loading} disabled={submitDisabled}>
          {submitChildren && submitChildren}
        </SubmitButton>
      </Grid>
    </Grid>
  );
};
