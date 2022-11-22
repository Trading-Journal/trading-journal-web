import React, { useEffect, useState } from 'react';
import { Direction } from '../../model/Direction';
import { EntryModel } from '../../model/EntryModel';
import { Dropdown } from '../dropdown/Dropdown';

interface Props {
  onChange: (item: Direction) => void;
  entry?: EntryModel;
}

export const DirectionSelect: React.FC<Props> = (props: Props) => {
  const { onChange, entry, ...rest } = props;

  const [direction, setDirection] = useState({
    key: Direction.LONG,
    value: Direction.LONG,
  });

  useEffect(() => {
    if (entry && entry.direction) {
      setDirection({
        key: entry.direction,
        value: entry.direction,
      });
    }
  }, [entry]);

  const directions = Object.entries(Direction).map(([key, value]) => ({
    key,
    value,
  }));

  const handleChange = (item: any) => {
    onChange(item.key);
  };

  return (
    <Dropdown
      id="direction-"
      label="Direction"
      required={true}
      items={directions}
      onChange={handleChange}
      selected={direction}
      {...{ disabled: entry?.id !== undefined }}
      {...rest}
    />
  );
};
