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
  currency: Currency
) => {
  const options = { ...defaultOptions, symbol: getSymbol(currency) };
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
  let valueFormatted;
  if (value) {
    valueFormatted = currencyFormat(value * 100);
  } else {
    valueFormatted = currencyFormat(0);
  }
  return `${valueFormatted} %`;
};

export const currencyFormat = (value: number | undefined, options?: Format) => {
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
