import { useEffect, useState } from 'react';
import { BalanceCard } from './BalanceCard';

export const ClosedPositionsCard = (props: any) => {
  const { journal } = props;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (journal && journal.currentBalance) {
      setBalance(journal?.currentBalance.closedPositions);
    }
  }, [journal]);

  return (
    <BalanceCard
      value={balance}
      changeColors={true}
      subtitle="Closed Positions"
    />
  );
};
