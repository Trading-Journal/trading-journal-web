import Grid from '@mui/material/Grid';
import { AlertCard } from './AlertCard';

export const FormAlert = ({ mutation }: { mutation: any }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} sx={{ mt: 1 }}>
        {mutation.isError && mutation.error instanceof Error ? (
          <AlertCard
            show={true}
            message={mutation.error.message}
            severity="error"
          />
        ) : null}
      </Grid>
    </Grid>
  );
};
