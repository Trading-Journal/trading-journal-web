import { Balance } from 'model';
import { useEffect, useState } from 'react';
import { BalanceCard } from './BalanceCard';

export const StartBalanceCard: React.FC<{ balance: Balance }> = ({
  balance,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (balance) {
      setValue(balance.startBalance);
    }
  }, [balance]);

  return (
    <BalanceCard
      value={value}
      subtitle="Start Balance"
      currency={balance.currency}
    />
  );
};
