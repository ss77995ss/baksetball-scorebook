/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { useTable, Column, Cell } from 'react-table';
import { StyledTable } from './styles';
import StatCell from './StatCell';
import StatCellWithCount from './StatCellWithCount';
import StatTitleCell from './StatTitleCell';
import TotalCell from './TotalCell';
import TotalCellWithCount from './TotalCellWithCount';
import { STAT_TYPE } from './constants';

const renderCell: (
  cell: Cell,
  updateData: (
    rowIndex: number,
    columnId: string,
    value:
      | { count: number; points: number }
      | number
      | { name: string; title: string | { points: string; count: string } },
  ) => void,
) => {} | null | undefined = (cell, updateData) => {
  switch (cell.column.Header) {
    case '項目':
      return <StatTitleCell cell={cell} updateData={updateData} />;
    case '總計':
      return cell.row.cells[0].value.type === STAT_TYPE.POINTS_AND_COUNT ? (
        <TotalCellWithCount row={cell.row} />
      ) : (
        <TotalCell row={cell.row} />
      );
    default:
      return cell.row.cells[0].value.type === STAT_TYPE.POINTS_AND_COUNT ? (
        <StatCellWithCount cell={cell} updateData={updateData} />
      ) : (
        <StatCell cell={cell} updateData={updateData} />
      );
  }
};

interface Props {
  columns: Array<Column>;
  initialData: Array<object>;
}

const StatTable: React.FC<Props> = ({ columns, initialData }: Props) => {
  const [data, setData] = useState(initialData);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const updateData: (
    rowIndex: number,
    columnId: string,
    value:
      | { count: number; points: number }
      | number
      | { name: string; title: string | { points: string; count: string } },
  ) => void = (rowIndex, columnId, value) => {
    setData(prev =>
      prev.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...prev[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }),
    );
  };

  return (
    <StyledTable>
      <h3>+/- by direction Up: +3, Down: -3, Left: -2, Right: +2, Click: +1, DoubleClick: -1</h3>
      <table {...getTableProps()}>
        <thead>
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props
                <th {...column.getHeaderProps()}>
                  {// Render the header
                  column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          rows.map(row => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return (
                    <td {...cell.getCellProps()}>
                      {// Render the cell contents
                      renderCell(cell, updateData)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </StyledTable>
  );
};

export default StatTable;
