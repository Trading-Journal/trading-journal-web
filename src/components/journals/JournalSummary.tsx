import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { JournalModel } from '../../model/JournalModel';
import { JournalSummaryCards } from './JournalSummaryCards';

export const JournalSummary = (props: any) => {
  const [journal, setJournal] = useState<JournalModel>();

  useEffect(() => {
    setJournal(props.journal);
  }, [props]);

  return (
    <Accordion
      variant="outlined"
      sx={{
        flexGrow: 1,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`journal-summary-accordion-${journal?.id}`}
        id={`journal-summary-accordion-${journal?.id}-id`}
      >
        <Typography fontSize="20">Journal Summary</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <JournalSummaryCards journal={journal} />
      </AccordionDetails>
    </Accordion>
  );
};
