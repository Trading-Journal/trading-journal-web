import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import React from 'react';

interface TextInputProps {
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  value?: string | null | undefined;
  autoFocus?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  maxRows?: number;
}

export const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  const {
    label,
    required,
    onChange,
    value,
    autoFocus,
    disabled,
    multiline,
    maxRows,
    ...rest
  } = props;
  return (
    <FormControl fullWidth>
      <TextField
        name={label}
        required={required}
        fullWidth
        id={label}
        label={label}
        autoFocus={autoFocus}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        multiline={multiline}
        {...(maxRows && { rows: maxRows })}
        {...rest}
      />
    </FormControl>
  );
};
