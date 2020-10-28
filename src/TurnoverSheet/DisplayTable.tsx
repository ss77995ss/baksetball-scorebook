/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable, Cell } from 'react-table';
import styled from 'styled-components';
import { StyledTable } from '../styles';
import { columns } from './constants';
import { TurnoverCategoriesType } from './types';
import TurnoverCategoriesHeader from './TurnoverCategoriesHeader';
import TurnoverCell from './TurnoverCell';
import TurnoverTotalRow from './TurnoverTotalRow';

const StyledCells = styled.td`
  font-size: 12px;
  padding: 0;

  span,
  li {
    padding: 4px 8px;
  }
`;

const renderCell: (cell: Cell<TurnoverCategoriesType>) => {} | null | undefined = cell => {
  switch (cell.column.Header) {
    case '名字':
    case '其他失誤':
    case '總計次數':
    case '總失分':
      return <span>{cell.value}</span>;
    default:
      return <TurnoverCell value={cell.value} />;
  }
};

interface Props {
  turnoverData: TurnoverCategoriesType[];
}

const DisplayTable: React.FC<Props> = ({ turnoverData }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: turnoverData,
  });

  return (
    <StyledTable>
      <table style={{ width: 1276 }} {...getTableProps()}>
        <thead>
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => {
                const isTurnoverCategoriesHeader =
                  column.Header === 'Drop' ||
                  column.Header === '非攻擊性傳球' ||
                  column.Header === '攻擊性傳球' ||
                  column.Header === '禁區傳球';

                return (
                  // Apply the header cell props
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      padding: !isTurnoverCategoriesHeader ? '1rem' : 0,
                    }}
                  >
                    {// Render the header
                    isTurnoverCategoriesHeader ? (
                      <TurnoverCategoriesHeader passType={column.Header} />
                    ) : (
                      column.render('Header')
                    )}
                  </th>
                );
              })}
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
                  return <StyledCells {...cell.getCellProps()}>{renderCell(cell)}</StyledCells>;
                })}
              </tr>
            );
          })}
          <TurnoverTotalRow rows={rows} />
        </tbody>
      </table>
    </StyledTable>
  );
};

export default DisplayTable;
