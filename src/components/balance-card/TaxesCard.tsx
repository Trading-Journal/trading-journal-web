import { useEffect, useState } from 'react';
import { BalanceCard } from './BalanceCard';

export const TaxesCard = (props: any) => {
  const { journal } = props;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (journal && journal.currentBalance) {
      setBalance(journal?.currentBalance.taxes);
    }
  }, [journal]);

  return <BalanceCard value={balance} subtitle="Taxes" />;
};
