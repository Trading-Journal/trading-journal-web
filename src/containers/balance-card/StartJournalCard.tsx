import { SimpleCard } from 'components/card';
import { Balance } from 'model';
import { useEffect, useState } from 'react';
import { displayFormatDate } from 'utilities';

export const StartJournalCard: React.FC<{ balance: Balance }> = ({
  balance,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (balance) {
      setValue(displayFormatDate(balance.startJournal));
    }
  }, [balance]);

  return <SimpleCard title={value} subtitle="Start Journal" />;
};
