import React, { useEffect, useState } from 'react';
import { EntryModel } from '../../model/EntryModel';
import { EntryTypeEnum } from '../../model/EntryTypeEnum';
import { Dropdown } from '../dropdown/Dropdown';

interface Props {
  onChange: (item: EntryTypeEnum) => void;
  entry?: EntryModel;
}

export const EntryTypeSelect: React.FC<Props> = (props: Props) => {
  const { onChange, entry, ...rest } = props;

  const [entryType, setEntryType] = useState({
    key: EntryTypeEnum.TRADE,
    value: EntryTypeEnum.TRADE,
  });

  useEffect(() => {
    if (entry) {
      setEntryType({
        key: entry.type,
        value: entry.type,
      });
    }
  }, [entry]);

  const entryTypes = Object.entries(EntryTypeEnum).map(([key, value]) => ({
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
