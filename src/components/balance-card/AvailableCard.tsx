import { useEffect, useState } from 'react';
import { BalanceModel } from '../../model/BalanceModel';
import { BalanceCard } from './BalanceCard';

export const AvailableCard: React.FC<{ balance: BalanceModel }> = ({
  balance,
}) => {
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
    />
  );
};
