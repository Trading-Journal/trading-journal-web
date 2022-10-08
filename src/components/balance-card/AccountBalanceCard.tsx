import { useEffect, useState } from 'react';
import { BalanceCard } from './BalanceCard';

export const AccountBalanceCard = (props: any) => {
  const { journal } = props;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (journal && journal.currentBalance) {
      setBalance(journal?.currentBalance.accountBalance);
    }
  }, [journal]);

  return (
    <BalanceCard
      value={balance}
      changeColors={true}
      subtitle="Account Balance"
    />
  );
};
