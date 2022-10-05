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

  return (
    <div className="mdc-data-table">
      <div className="mdc-data-table__table-container">
        <table className="mdc-data-table__table" aria-label="Dessert calories">
          <thead>
            <tr className="mdc-data-table__header-row">
              {columns.map((item) => (
                <th
                  className="mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                  key={item.name}
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="mdc-data-table__content">
            <tr className="mdc-data-table__row">
              <th className="mdc-data-table__cell" scope="row">
                Frozen yogurt
              </th>
              <td className="mdc-data-table__cell">24</td>
              <td className="mdc-data-table__cell">4.0</td>
              <td className="mdc-data-table__cell">Super tasty</td>
            </tr>
            <tr className="mdc-data-table__row">
              <th className="mdc-data-table__cell" scope="row">
                Ice cream sandwich
              </th>
              <td className="mdc-data-table__cell">37</td>
              <td className="mdc-data-table__cell">4.33333333333</td>
              <td className="mdc-data-table__cell">I like ice cream more</td>
            </tr>
            <tr className="mdc-data-table__row">
              <th className="mdc-data-table__cell" scope="row">
                Eclair
              </th>
              <td className="mdc-data-table__cell">24</td>
              <td className="mdc-data-table__cell">6.0</td>
              <td className="mdc-data-table__cell">New filing flavor</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
