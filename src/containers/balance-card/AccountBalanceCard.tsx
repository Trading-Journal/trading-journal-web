import { Balance } from 'model';
import { useEffect, useState } from 'react';
import { getSymbol } from 'utilities';
import { BalanceCard } from './BalanceCard';

export const AccountBalanceCard: React.FC<{ balance: Balance }> = ({
  balance,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (balance) {
      setValue(balance.accountBalance);
    }
  }, [balance]);

  return (
    <BalanceCard
      value={value}
      changeColors={true}
      subtitle="Account Balance"
      currency={getSymbol(balance.currency)}
    />
  );
};
