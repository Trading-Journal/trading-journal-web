import { SimpleCard } from 'components/card';
import React, { useEffect, useState } from 'react';
import { currencyFormatter } from 'utilities';

interface CardProps {
  value: number;
  subtitle: string;
  changeColors?: boolean;
  positiveColor?: string;
  negativeColor?: string;
  currency?: string;
}

export const BalanceCard: React.FC<CardProps> = ({
  value,
  subtitle,
  positiveColor = 'green',
  negativeColor = 'red',
  currency = '$',
}) => {
  const defaultColor = 'black';
  const [formattedValue, setFormattedValue] = useState('');
  const [titleColor, setTitleColor] = useState(defaultColor);

  useEffect(() => {
    setFormattedValue(currencyFormatter(value, { symbol: currency }));
  }, [value, currency]);

  useEffect(() => {
    if (value > 0) {
      setTitleColor(positiveColor);
    } else if (value < 0) {
      setTitleColor(negativeColor);
    } else {
      setTitleColor(defaultColor);
    }
  }, [value, positiveColor, negativeColor]);

  return (
    <SimpleCard
      title={formattedValue}
      titleColor={titleColor}
      subtitle={subtitle}
    />
  );
};
