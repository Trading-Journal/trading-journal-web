import { useEffect, useState } from 'react';
import { BalanceModel } from '../../model/BalanceModel';
import { BalanceCard } from './BalanceCard';

export const WithdrawalsCard: React.FC<{ balance: BalanceModel }> = ({
  balance,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (balance) {
      setValue(balance.withdrawals);
    }
  }, [balance]);

  return <BalanceCard value={value} subtitle="Withdrawals" />;
};
