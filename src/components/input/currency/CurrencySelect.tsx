import { Currency } from 'model';
import React, { useEffect, useState } from 'react';
import { Dropdown } from '../dropdown/Dropdown';

interface Props {
  onChange: (item: Currency) => void;
  value?: Currency;
  required?: boolean;
}

export const CurrencySelect: React.FC<Props> = (props: Props) => {
  const { onChange, value, required, ...rest } = props;

  const [currency, setCurrency] = useState({
    key: Currency.DOLLAR,
    value: Currency.DOLLAR,
  });

  useEffect(() => {
    if (value) {
      setCurrency({
        key: value,
        value: value,
      });
    }
  }, [value]);

  const currencies = Object.entries(Currency).map(([key, value]) => ({
    key,
    value,
  }));

  const handleChange = (item: any) => {
    onChange(item.key);
  };

  return (
    <Dropdown
      id="direction-"
      label="Currency"
      required={required}
      items={currencies}
      onChange={handleChange}
      selected={currency}
      {...rest}
    />
  );
};
