import { useEffect, useState } from 'react';
import { BalanceCard } from './BalanceCard';

export const StartBalanceCard = (props: any) => {
  const { journal } = props;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (journal) {
      setBalance(journal?.startBalance);
    }
  }, [journal]);

  return <BalanceCard value={balance} subtitle="Start Balance" />;
};
