import { useEffect, useState } from 'react';
import { BalanceModel } from '../../model/BalanceModel';
import { BalanceCard } from './BalanceCard';

export const ClosedPositionsCard: React.FC<{ balance: BalanceModel }> = ({
  balance,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (balance) {
      setValue(balance.closedPositions);
    }
  }, [balance]);

  return (
    <BalanceCard
      value={value}
      changeColors={true}
      subtitle="Closed Positions"
    />
  );
};
