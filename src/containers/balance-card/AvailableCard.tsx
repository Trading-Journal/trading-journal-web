import { Balance } from 'model';
import { useEffect, useState } from 'react';
import { getSymbol } from 'utilities';
import { BalanceCard } from './BalanceCard';

export const AvailableCard: React.FC<{ balance: Balance }> = ({ balance }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (balance) {
      setValue(balance.available);
    }
  }, [balance]);

  return (
    <BalanceCard
      value={value}
      changeColors={false}
      subtitle="Available to Invest"
      currency={getSymbol(balance.currency)}
    />
  );
};
