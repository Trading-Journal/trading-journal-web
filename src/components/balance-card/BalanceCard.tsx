import React, { useEffect, useState } from 'react';
import { currencyFormatter } from '../../util/NumberFormat';
import { SimpleCard } from '../card/SimpleCard';

interface CardProps {
  value: number | string;
  subtitle: string;
  changeColors?: boolean;
  positiveColor?: string;
  negativeColor?: string;
}

export const BalanceCard: React.FC<CardProps> = ({
  value,
  subtitle,
  positiveColor = 'green',
  negativeColor = 'red',
}) => {
  const defaultColor = 'black';
  const [formattedValue, setFormattedValue] = useState('');
  const [titleColor, setTitleColor] = useState(defaultColor);

  useEffect(() => {
    if (typeof value === 'number') {
      setFormattedValue(currencyFormatter(value));
    } else {
      setFormattedValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (typeof value === 'number') {
      if (value > 0) {
        setTitleColor(positiveColor);
      } else if (value < 0) {
        setTitleColor(negativeColor);
      } else {
        setTitleColor(defaultColor);
      }
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
