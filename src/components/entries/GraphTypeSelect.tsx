import React, { useEffect, useState } from 'react';
import { EntryModel } from '../../model/EntryModel';
import { GraphType } from '../../model/GraphType';
import { Dropdown } from '../dropdown/Dropdown';

interface Props {
  onChange: (item: GraphType | undefined) => void;
  entry?: EntryModel;
}

export const GraphTypeSelect: React.FC<Props> = (props: Props) => {
  const { onChange, entry, ...rest } = props;

  const [graphType, setGraphType] = useState({
    key: '',
    value: '',
  });

  useEffect(() => {
    if (entry && entry.graphType) {
      setGraphType({
        key: entry.graphType,
        value: entry.graphType,
      });
    }
  }, [entry]);

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
