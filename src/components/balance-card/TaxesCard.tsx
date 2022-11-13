import { useEffect, useState } from 'react';
import { BalanceModel } from '../../model/BalanceModel';
import { getSymbol } from '../../util/NumberFormat';
import { BalanceCard } from './BalanceCard';

export const TaxesCard: React.FC<{ balance: BalanceModel }> = ({ balance }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (balance) {
      setValue(balance.taxes);
    }
  }, [balance]);

  return (
    <BalanceCard
      value={value}
      subtitle="Taxes"
      currency={getSymbol(balance.currency)}
    />
  );
};
