/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable } from 'react-table';
import { StyledTable } from '../styles';
import { columns, initialTurnoverData } from './constants';
import TurnoverCategoriesHeader from './TurnoverCategoriesHeader';

const DisplayTable: React.FC = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: initialTurnoverData,
  });

  return (
    <StyledTable>
      <table style={{ width: 1000 }} {...getTableProps()}>
        <thead>
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => {
                const isTurnoverCategoriesHeader =
                  column.Header === 'Drop' ||
                  column.Header === '橫傳球' ||
                  column.Header === '直傳球' ||
                  column.Header === '其他傳球';

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
                  return (
                    <td {...cell.getCellProps()}>
                      {
                        // Render the cell contents
                        // cell.render('Cell')
                      }
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

export default DisplayTable;
