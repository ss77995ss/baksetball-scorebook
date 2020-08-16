/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable, Cell } from 'react-table';
import { StyledTable } from './styles';
import { useStatsState } from './hooks/statData';
import { STAT_TYPE } from './constants';
import { getTotal, getTotalWithCount } from './utils';
import { StyledTitleCell } from './styles';

const renderCell: (cell: Cell) => {} | null | undefined = cell => {
  switch (cell.column.Header) {
    case '項目':
      return (
        <>
          <div>{cell.value.name}</div>
          <div>
            {typeof cell.value.title === 'object'
              ? `${cell.value.title.points}/${cell.value.title.count}`
              : cell.value.title}
          </div>
        </>
      );
    case '總計':
      return cell.row.cells[0].value.type === STAT_TYPE.POINTS_AND_COUNT
        ? getTotalWithCount(cell.row.values)
        : getTotal(cell.row.values);
    default:
      return typeof cell.value === 'object' ? `${cell.value.points}/${cell.value.count}` : cell.value;
  }
};

interface Props {
  team: string;
  teamName: string;
}

const DisplayTable: React.FC<Props> = ({ team, teamName }: Props) => {
  const { columns, home, away } = useStatsState();
  const data = team === 'home' ? home : away;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <StyledTable>
      <h3>{teamName}</h3>
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
                      {
                        // Render the cell contents
                        <StyledTitleCell>{renderCell(cell)}</StyledTitleCell>
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
