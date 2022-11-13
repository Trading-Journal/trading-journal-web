import { useEffect, useState } from 'react';
import { BalanceModel } from '../../model/BalanceModel';
import { getSymbol } from '../../util/NumberFormat';
import { BalanceCard } from './BalanceCard';

export const StartBalanceCard: React.FC<{ balance: BalanceModel }> = ({
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
      currency={getSymbol(balance.currency)}
    />
  );
};
