interface Format {
  digits?: number;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  symbol?: string;
}

const defaultOptions: Format = {
  digits: 2,
  thousandsSeparator: ',',
  decimalSeparator: '.',
  symbol: '$',
};

export const currencyFormatter = (value: number, options?: Format) => {
  options = { ...defaultOptions, ...options };
  const fixed = value.toFixed(options.digits);

  const [currency, decimal] = fixed.split('.');

  const thousandsSeparator = options.thousandsSeparator ?? '.';

  return `${options.symbol} ${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator
  )}${options.decimalSeparator}${decimal}`;
};
