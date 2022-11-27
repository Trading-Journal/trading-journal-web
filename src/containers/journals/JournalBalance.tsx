import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useJournalBalanceQuery } from 'queries';
import React from 'react';
import { JournalBalanceCards } from './JournalBalanceCards';

export const JournalBalance: React.FC<{ journalId: string }> = ({
  journalId,
}) => {
  const { data: balance, isSuccess } = useJournalBalanceQuery(journalId);

  return (
    <Accordion
      variant="outlined"
      sx={{
        flexGrow: 1,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`journal-summary-accordion-${journalId}`}
        id={`journal-summary-accordion-${journalId}-id`}
      >
        <Typography fontSize="20">Journal Summary</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isSuccess && <JournalBalanceCards balance={balance} />}
      </AccordionDetails>
    </Accordion>
  );
};
