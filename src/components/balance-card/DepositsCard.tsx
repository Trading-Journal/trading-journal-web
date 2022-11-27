import { useEffect, useState } from 'react';
import { Balance } from '../../model';
import { getSymbol } from '../../util/NumberFormat';
import { BalanceCard } from './BalanceCard';

export const DepositsCard: React.FC<{ balance: Balance }> = ({ balance }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (balance) {
      setValue(balance.deposits);
    }
  }, [balance]);

  return (
    <BalanceCard
      value={value}
      subtitle="Deposits"
      currency={getSymbol(balance.currency)}
    />
  );
};
