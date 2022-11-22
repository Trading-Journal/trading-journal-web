import React, { useEffect, useState } from 'react';
import { EntryModel } from '../../model/EntryModel';
import { EntryType } from '../../model/EntryType';
import { Dropdown } from '../dropdown/Dropdown';

interface Props {
  onChange: (item: EntryType) => void;
  entry?: EntryModel;
}

export const EntryTypeSelect: React.FC<Props> = (props: Props) => {
  const { onChange, entry, ...rest } = props;

  const [entryType, setEntryType] = useState({
    key: EntryType.TRADE,
    value: EntryType.TRADE,
  });

  useEffect(() => {
    if (entry) {
      setEntryType({
        key: entry.type,
        value: entry.type,
      });
    }
  }, [entry]);

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
      {...{ disabled: entry?.id !== undefined }}
      {...rest}
    />
  );
};
