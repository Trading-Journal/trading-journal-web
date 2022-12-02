import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect } from 'react';

interface Item {
  key: any;
  value: any;
}

interface DropdownProps {
  id: string;
  label: string;
  required?: boolean;
  items: Item[];
  onChange: (item: Item) => void;
  selected?: Item;
  disabled?: boolean;
  width?: number;
  small?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const {
    label,
    required,
    items,
    selected,
    disabled,
    width,
    small,
    onChange,
    id,
    ...rest
  } = props;
  const [current, setCurrentValue] = React.useState<Item>(selected!);

  const handleChange = (event: SelectChangeEvent) => {
    const selected = items.find(
      (item: Item) => item.key === event.target.value
    );
    setCurrentValue(selected!);
    onChange(selected!);
  };

  useEffect(() => {
    setCurrentValue(selected!);
  }, [selected]);

  return (
    <FormControl
      fullWidth={width === undefined}
      size={small ? 'small' : 'medium'}
    >
      <InputLabel id={`${id}-input-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-select-label`}
        id={`${id}-select`}
        value={current?.key}
        label={label}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        sx={{
          width: width,
        }}
        {...rest}
      >
        {items.map((item: Item, index: number) => (
          <MenuItem
            key={`${id}-menu-item-${index}`}
            id={`${id}-menu-item-${index}`}
            value={item.key}
          >
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
