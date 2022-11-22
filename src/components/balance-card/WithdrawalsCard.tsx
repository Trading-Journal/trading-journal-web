import { useEffect, useState } from 'react';
import { Balance } from '../../model/Balance';
import { getSymbol } from '../../util/NumberFormat';
import { BalanceCard } from './BalanceCard';

export const WithdrawalsCard: React.FC<{ balance: Balance }> = ({
  balance,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (balance) {
      setValue(balance.withdrawals);
    }
  }, [balance]);

  return (
    <BalanceCard
      value={value}
      subtitle="Withdrawals"
      currency={getSymbol(balance.currency)}
    />
  );
};
