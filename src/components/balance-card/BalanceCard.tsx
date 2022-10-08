import React, { useEffect, useState } from 'react';
import { currencyFormatter } from '../../util/NumberFormat';
import { SimpleCard } from '../card/SimpleCard';

interface CardProps {
  value: number;
  subtitle: string;
  changeColors?: boolean;
  positiveColor?: string;
  negativeColor?: string;
}

export const BalanceCard: React.FC<CardProps> = ({
  value,
  subtitle,
  changeColors = false,
  positiveColor = 'green',
  negativeColor = 'red',
}) => {
  const defaultColor = 'black';
  const [formattedValue, setFormattedValue] = useState('');
  const [titleColor, setTitleColor] = useState(defaultColor);

  useEffect(() => {
    setFormattedValue(currencyFormatter(value));
  }, [value]);

  useEffect(() => {
    if (changeColors) {
      if (value > 0) {
        setTitleColor(positiveColor);
      } else if (value < 0) {
        setTitleColor(negativeColor);
      } else {
        setTitleColor(defaultColor);
      }
    }
  }, [value, changeColors, positiveColor, negativeColor]);

  return (
    <SimpleCard
      title={formattedValue}
      titleColor={titleColor}
      subtitle={subtitle}
    />
  );
};
