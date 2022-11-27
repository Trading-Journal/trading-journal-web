import React, { useEffect, useState } from 'react';
import { GraphType } from '../../model/GraphType';
import { Dropdown } from '../input';

interface Props {
  onChange: (item: GraphType | undefined) => void;
  value?: GraphType;
}

export const GraphTypeSelect: React.FC<Props> = (props: Props) => {
  const { onChange, value, ...rest } = props;

  const [graphType, setGraphType] = useState({
    key: '',
    value: '',
  });

  useEffect(() => {
    if (value) {
      setGraphType({
        key: value,
        value: value,
      });
    }
  }, [value]);

  const graphTypes = [{ key: '', value: 'No Graph' }];
  const enumTypes = Object.entries(GraphType).map(([key, value]) => ({
    key: key as string,
    value: value as string,
  }));
  graphTypes.push(...enumTypes);

  const handleChange = (item: any) => {
    if (item.key === '') {
      onChange(undefined);
    } else {
      onChange(item.key);
    }
  };

  return (
    <Dropdown
      id="graph-type"
      label="Graph type"
      items={graphTypes}
      onChange={handleChange}
      selected={graphType}
      {...rest}
    />
  );
};
