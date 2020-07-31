/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable, Column } from 'react-table';
import styled from 'styled-components';
import TableCell from './TableCells';

const columns: Array<Column> = [
  {
    Header: '項目',
    accessor: 'stats',
  },
  {
    Header: 'Q1',
    accessor: 'q1',
  },
  {
    Header: 'Q2',
    accessor: 'q2',
  },
  {
    Header: 'Q3',
    accessor: 'q3',
  },
  {
    Header: 'Q4',
    accessor: 'q4',
  },
  {
    Header: '總計',
    accessor: 'total',
  },
];

const data: Array<object> = [
  {
    stats: '失誤',
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    total: 0,
  },
];

const defaultColumn = {
  Cell: TableCell,
};

const TableStyled = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }
`;

const StatsTable: React.FC = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    defaultColumn,
  });
  return (
    <TableStyled>
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
                      cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableStyled>
  );
};

export default StatsTable;
