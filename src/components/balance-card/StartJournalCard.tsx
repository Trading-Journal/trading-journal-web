import { useEffect, useState } from 'react';
import { BalanceModel } from '../../model/BalanceModel';
import { displayFormatDate } from '../../util/DateFormat';
import { SimpleCard } from '../card/SimpleCard';

export const StartJournalCard: React.FC<{ balance: BalanceModel }> = ({
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
