import { Balance } from 'model';
import { useEffect, useState } from 'react';
import { BalanceCard } from './BalanceCard';

export const ClosedPositionsCard: React.FC<{ balance: Balance }> = ({
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
      currency={balance.currency}
    />
  );
};
