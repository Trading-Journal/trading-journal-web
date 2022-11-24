import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import React, { useEffect } from 'react';

interface DateTimeProps {
  label: string;
  required?: boolean;
  value?: string | Date | null;
  startNow?: boolean;
  onlyDate?: boolean;
  disabled?: boolean;
  onChange: (date: Date | null) => void;
}

export const Datetime: React.FC<DateTimeProps> = (props: DateTimeProps) => {
  const { label, required, value, startNow, onlyDate, disabled, onChange } =
    props;

  const now = startNow ? dayjs() : null;
  const [current, setCurrentValue] = React.useState<Dayjs | null>(now);
  const [locale] = React.useState('en-gb');

  useEffect(() => {
    if (value) {
      setCurrentValue(dayjs(value));
    }
  }, [value]);

  const onDateChange = (value: Dayjs | null) => {
    setCurrentValue(value);
    if (value) {
      onChange(value.toDate());
    } else {
      onChange(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      {onlyDate && (
        <FormControl fullWidth>
          <DesktopDatePicker
            renderInput={(props) => (
              <TextField required={required} {...props} />
            )}
            label={label}
            value={current}
            disabled={disabled}
            onChange={onDateChange}
          />
        </FormControl>
      )}

      {!onlyDate && (
        <FormControl fullWidth>
          <DateTimePicker
            renderInput={(props) => (
              <TextField required={required} {...props} />
            )}
            label={label}
            value={current}
            ampm={false}
            disabled={disabled}
            onChange={onDateChange}
          />
        </FormControl>
      )}
    </LocalizationProvider>
  );
};
