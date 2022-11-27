import { Currency } from 'model';

interface Format {
  digits?: number;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  symbol?: string;
}

const defaultOptions: Format = {
  digits: 2,
  thousandsSeparator: '.',
  decimalSeparator: ',',
  symbol: '$',
};

export const currencyFormatter = (
  value: number | undefined,
  options?: Format
) => {
  options = { ...defaultOptions, ...options };
  const formatted = currencyFormat(value, options);

  return `${options.symbol} ${formatted}`;
};

export const getSymbol = (currency: Currency) => {
  if (currency === Currency.DOLLAR) {
    return '$';
  } else if (currency === Currency.EURO) {
    return '€';
  } else {
    return 'R$';
  }
};

export const percentFormatter = (value: number | undefined) => {
  if (value) {
    const valueFormatted = currencyFormat(value * 100);
    return `${valueFormatted} %`;
  } else {
    return '';
  }
};

const currencyFormat = (value: number | undefined, options?: Format) => {
  if (!value) {
    value = 0;
  }

  options = { ...defaultOptions, ...options };
  const fixed = value.toFixed(options.digits);

  const [currency, decimal] = fixed.split('.');

  const thousandsSeparator = options.thousandsSeparator ?? '.';

  return `${currency.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)}${
    options.decimalSeparator
  }${decimal}`;
};
