import { useEffect, useState } from 'react';
import { Balance } from '../../model/Balance';
import { displayFormatDate } from '../../util/DateFormat';
import { SimpleCard } from '../card';

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
