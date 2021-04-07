/* eslint-disable react/jsx-key */
import { ReactElement } from 'react';
import { useTable, Cell } from 'react-table';
import styled from 'styled-components';
import { BoxType } from './types';
import { columns } from './constants';
import { StyledTable } from '../styles';
import ReboundHeader from './ReboundHeader';
import ShootingHeader from './ShootingHeader';
import ReboundCell from './ReboundCell';
import ShootingCell from './ShootingCell';

const StyledNormalHeader = styled.th`
  border-right: 1px solid black;
`;

const StyledLeftHLHeader = styled.th`
  border-left: 1px solid black;
`;

const renderCell: (cell: Cell<BoxType>) => ReactElement | null | undefined = (cell) => {
  switch (cell.column.Header) {
    case '名字':
      return <span>{cell.value.name}</span>;
    case '籃板':
      return <ReboundCell value={cell.value} />;
    case 'FG':
    case '3PT':
    case 'FT':
      return <ShootingCell value={cell.value} />;
    default:
      return <span>{cell.value}</span>;
  }
};

interface Props {
  boxScore: BoxType[];
}

const BoxScore: React.FC<Props> = ({ boxScore }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: boxScore,
  });

  return (
    <StyledTable>
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => {
                    switch (column.Header) {
                      case '籃板':
                        return <ReboundHeader />;
                      case 'FG':
                      case '3PT':
                      case 'FT':
                        return <ShootingHeader shootingType={column.Header} />;
                      case '助攻':
                      case '抄截':
                        return <StyledLeftHLHeader>{column.render('Header')}</StyledLeftHLHeader>;
                      default:
                        return <StyledNormalHeader>{column.render('Header')}</StyledNormalHeader>;
                    }
                  })
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return <td {...cell.getCellProps()}>{renderCell(cell)}</td>;
                  })
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </StyledTable>
  );
};

export default BoxScore;
