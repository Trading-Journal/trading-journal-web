import React, { useEffect, useState } from 'react';
import { Direction } from '../../model/Direction';
import { Dropdown } from '../dropdown/Dropdown';

interface Props {
  onChange: (item: Direction) => void;
  value?: Direction;
}

export const DirectionSelect: React.FC<Props> = (props: Props) => {
  const { onChange, value, ...rest } = props;

  const [direction, setDirection] = useState({
    key: Direction.LONG,
    value: Direction.LONG,
  });

  useEffect(() => {
    if (value) {
      setDirection({
        key: value,
        value: value,
      });
    }
  }, [value]);

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
      {...rest}
    />
  );
};
