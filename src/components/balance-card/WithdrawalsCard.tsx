import { useEffect, useState } from 'react';
import { BalanceCard } from './BalanceCard';

export const WithdrawalsCard = (props: any) => {
  const { journal } = props;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (journal && journal.currentBalance) {
      setBalance(journal?.currentBalance.withdrawals);
    }
  }, [journal]);

  return <BalanceCard value={balance} subtitle="Withdrawals" />;
};
