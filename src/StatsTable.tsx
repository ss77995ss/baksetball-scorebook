/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { useTable, Column, Cell } from 'react-table';
import styled from 'styled-components';
import StatCell from './StatCell';
import TotalCell from './TotalCell';

const columns: Array<Column> = [
  {
    Header: '項目',
    accessor: 'statName',
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

const initialData: Array<object> = [
  {
    statName: '失誤',
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    total: 0,
  },
];

const defaultColumn = {};

const StyledTable = styled.div`
  h3 {
    text-align: center;
  }
  table {
    border-spacing: 0;
    border: 1px solid black;
    margin: 16px auto;

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

const StyledRadioInput = styled.div`
  text-align: center;
`;

const renderCell: (
  cell: Cell,
  count: number,
  updateData: (rowIndex: number, columnId: string, value: number) => void,
) => {} | null | undefined = (cell, count, updateData) => {
  switch (cell.column.Header) {
    case '項目':
      return cell.render('Cell');
    case '總計':
      return <TotalCell row={cell.row} />;
    default:
      return <StatCell row={cell.row} column={cell.column} value={cell.value} count={count} updateData={updateData} />;
  }
};

const StatsTable: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [count, setcount] = useState(1);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    defaultColumn,
  });

  const handleCheck: (event: { target: HTMLInputElement }) => void = event =>
    setcount(parseInt(event.target.value, 10));

  const updateData: (rowIndex: number, columnId: string, value: number) => void = (rowIndex, columnId, value) => {
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
      <h3>+/- by selected count</h3>
      <StyledRadioInput>
        <input type="radio" id="one" name="count" value="1" checked={count === 1} onChange={handleCheck} />
        <label htmlFor="one">1</label>
        <input type="radio" id="two" name="count" value="2" checked={count === 2} onChange={handleCheck} />
        <label htmlFor="two">2</label>
        <input type="radio" id="three" name="count" value="3" checked={count === 3} onChange={handleCheck} />
        <label htmlFor="three">3</label>
        <p>{`Current: ${count}`}</p>
      </StyledRadioInput>
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
                      renderCell(cell, count, updateData)}
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

export default StatsTable;
