import { useEffect, useState } from 'react';
import { BalanceModel } from '../../model/BalanceModel';
import { BalanceCard } from './BalanceCard';

export const DepositsCard: React.FC<{ balance: BalanceModel }> = ({
  balance,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (balance) {
      setValue(balance.deposits);
    }
  }, [balance]);

  return <BalanceCard value={value} subtitle="Deposits" />;
};
