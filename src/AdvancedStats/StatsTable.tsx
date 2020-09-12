/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { useTable, Cell } from 'react-table';
import { StyledTable } from '../styles';
import { useStatsState } from './hooks/statData';
import { StatType } from './types';
import { STAT_TYPE } from './constants';
import StatCell from './StatCell';
import StatCellWithCount from './StatCellWithCount';
import StatTitleCell from './StatTitleCell';
import TotalCell from './TotalCell';
import TotalCellWithCount from './TotalCellWithCount';
import ReadOnlyCell from './ReadOnlyCell';

const renderCell: (quarter: string, team: string, cell: Cell<StatType>) => {} | null | undefined = (
  quarter,
  team,
  cell,
) => {
  switch (cell.column.Header) {
    case '項目':
      return <StatTitleCell cell={cell} />;
    case '總計':
      return cell.row.cells[0].value.type === STAT_TYPE.POINTS_AND_COUNT ? (
        <TotalCellWithCount row={cell.row} />
      ) : (
        <TotalCell row={cell.row} />
      );
    default: {
      if (cell.column.id !== quarter) return <ReadOnlyCell cell={cell} />;

      return cell.row.cells[0].value.type === STAT_TYPE.POINTS_AND_COUNT ? (
        <StatCellWithCount cell={cell} team={team} isSwipeable={cell.row.cells[0].value.isSwipeable} />
      ) : (
        <StatCell cell={cell} team={team} />
      );
    }
  }
};

interface Props {
  team: string;
}

const StatTable: React.FC<Props> = ({ team }: Props) => {
  const [quarter, setQuarter] = useState('q1');
  const { columns, home, away } = useStatsState();
  const data = team === 'home' ? home : away;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

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
              headerGroup.headers.map(column => {
                const headerProps =
                  column.Header !== '項目' && column.Header !== '總計'
                    ? {
                        ...column.getHeaderProps(),
                        style: { cursor: 'pointer' },
                        onClick: (): void => setQuarter(column.id),
                      }
                    : column.getHeaderProps();
                // Apply the header cell props
                return (
                  <th {...headerProps}>
                    {// Render the header
                    column.render('Header')}
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
                      {// Render the cell contents
                      renderCell(quarter, team, cell)}
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
