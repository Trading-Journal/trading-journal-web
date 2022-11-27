import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import Typography from '@mui/material/Typography';

export const Accordion = ({
  title,
  children,
  fontSize = 18,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  fontSize?: number;
}) => {
  return (
    <MuiAccordion
      variant="outlined"
      sx={{
        flexGrow: 1,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontSize={fontSize}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};
