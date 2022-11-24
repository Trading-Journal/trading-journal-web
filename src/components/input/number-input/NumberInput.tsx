import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import React, { RefCallback, useEffect } from 'react';
import { IMaskInput } from 'react-imask';

interface Props {
  onChange: (value: number | undefined) => void;
  value: number | undefined;
  label: string;
  scale: number;
  name?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  thousandSeparator?: boolean;
  decimalSeparator?: boolean;
  zeroIsNull?: boolean;
}

interface TextMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  scale: number;
  padFractionalZeros: boolean;
}

const TextMaskCustom = React.forwardRef<HTMLElement, TextMaskProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, scale, padFractionalZeros, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={Number}
        unmask={true}
        lazy={false}
        inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
        onAccept={(value: any) => {
          onChange({ target: { name: props.name, value } });
        }}
        min={0}
        max={Number.MAX_SAFE_INTEGER}
        mapToRadix={['.']}
        scale={scale}
        padFractionalZeros={padFractionalZeros}
        thousandsSeparator="."
        radix=","
      />
    );
  }
);

export const NumberInput: React.FC<Props> = (props: Props) => {
  const {
    onChange,
    label,
    name,
    scale,
    value,
    thousandSeparator,
    decimalSeparator,
    zeroIsNull,
    required,
    autoFocus,
    disabled,
    ...rest
  } = props;

  const padFractionalZeros = scale > 0;

  const [current, setCurrent] = React.useState<number | undefined>(value);

  useEffect(() => {
    setCurrent(value ?? 0);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const current = parseFloat(event.target.value);
    if (zeroIsNull && current === 0) {
      setCurrent(undefined);
      onChange(undefined);
    } else {
      setCurrent(current);
      onChange(current);
    }
  };

  return (
    <FormControl fullWidth>
      <TextField
        value={current ? current.toString() : ''}
        onChange={handleChange}
        name={name}
        label={label}
        id={name}
        required={required}
        autoFocus={autoFocus}
        disabled={disabled}
        InputProps={{
          inputComponent: TextMaskCustom as any,
          inputProps: {
            scale: scale,
            padFractionalZeros: padFractionalZeros,
          },
        }}
        {...rest}
      />
    </FormControl>
  );
};
