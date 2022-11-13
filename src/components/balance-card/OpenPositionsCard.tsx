import { useEffect, useState } from 'react';
import { BalanceModel } from '../../model/BalanceModel';
import { getSymbol } from '../../util/NumberFormat';
import { BalanceCard } from './BalanceCard';

export const OpenPositionsCard: React.FC<{ balance: BalanceModel }> = ({
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
