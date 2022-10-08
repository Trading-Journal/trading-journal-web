import React from 'react';

export interface Column {
  name: string;
  label: string;
}

interface Props {
  columns: Column[];
  items?: React.ReactNode[];
}

export const Table: React.FC<Props> = (props) => {
  const { columns } = props;

  //   return <button {...rest}>{children}</button>;

  return <div></div>;
};
