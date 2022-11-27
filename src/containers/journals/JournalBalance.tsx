import { Accordion } from 'components/accordion/Accordion';
import { useJournalBalanceQuery } from 'queries';
import React from 'react';
import { JournalBalanceCards } from './JournalBalanceCards';

export const JournalBalance: React.FC<{ journalId: string }> = ({
  journalId,
}) => {
  const { data: balance, isSuccess } = useJournalBalanceQuery(journalId);

  return (
    <Accordion title="Journal Summary">
      {isSuccess && <JournalBalanceCards balance={balance} />}
    </Accordion>
  );
};
