import { useEffect, useState } from 'react';
import { Balance } from '../../model';
import { getSymbol } from '../../util/NumberFormat';
import { BalanceCard } from './BalanceCard';

export const OpenPositionsCard: React.FC<{ balance: Balance }> = ({
  balance,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (balance) {
      setValue(balance.openedPositions);
    }
  }, [balance]);

  return (
    <BalanceCard
      value={value}
      changeColors={false}
      subtitle="Open Positions"
      currency={getSymbol(balance.currency)}
    />
  );
};
