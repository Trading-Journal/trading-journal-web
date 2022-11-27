import { EntryType } from 'model';
import React, { useEffect, useState } from 'react';
import { Dropdown } from '../dropdown/Dropdown';

interface Props {
  onChange: (item: EntryType) => void;
  value?: EntryType;
}

export const EntryTypeSelect: React.FC<Props> = (props: Props) => {
  const { onChange, value, ...rest } = props;

  const [entryType, setEntryType] = useState({
    key: EntryType.TRADE,
    value: EntryType.TRADE,
  });

  useEffect(() => {
    if (value) {
      setEntryType({
        key: value,
        value: value,
      });
    }
  }, [value]);

  const entryTypes = Object.entries(EntryType).map(([key, value]) => ({
    key,
    value,
  }));

  const handleChange = (item: any) => {
    onChange(item.key);
  };

  return (
    <Dropdown
      id="entry-type"
      label="Entry type"
      required={true}
      items={entryTypes}
      onChange={handleChange}
      selected={entryType}
      {...rest}
    />
  );
};
