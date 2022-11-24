import React, { useEffect, useState } from 'react';
import { Currency } from '../../model/Currency';
import { Dropdown } from '../input/dropdown/Dropdown';

interface Props {
  value?: Currency;
  onChange: (item: Currency) => void;
}

export const CurrencySelect: React.FC<Props> = (props: Props) => {
  const { onChange, value, ...rest } = props;

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
      required={true}
      items={currencies}
      onChange={handleChange}
      selected={currency}
      {...rest}
    />
  );
};
