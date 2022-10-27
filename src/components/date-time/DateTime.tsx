import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import React, { useEffect } from 'react';

interface DateTimeProps {
  label: string;
  required: boolean;
  value?: string | Date | null;
  startNow?: boolean;
  onChange: (date: Date | null) => void;
}

export const Datetime: React.FC<DateTimeProps> = (props: DateTimeProps) => {
  const { label, required, value, startNow, onChange } = props;

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
      <DateTimePicker
        renderInput={(props) => <TextField required={required} {...props} />}
        label={label}
        value={current}
        ampm={false}
        onChange={onDateChange}
      />
    </LocalizationProvider>
  );
};
