/* eslint-disable react/jsx-key */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { SinglePlayerBoxType } from '../../../types';
import { singlePlayerColumns } from '../../../constants';
import ReboundHeader from '../ReboundHeader';
import ShootingHeader from '../ShootingHeader';
import ReboundCell from '../ReboundCell';
import ShootingCell from '../ShootingCell';

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: auto;
`;

const StyledHeader = styled.th`
  border: 1px solid black;
  padding: 0 4px;
`;

const StyledCell = styled.td`
  border: 1px solid black;
  padding: 0 4px;
  text-align: center;
`;

const StyledSplitCell = styled.td`
  border: 1px solid black;
  padding: 0;
  text-align: center;
`;

const StyledCol = styled.col`
  border: 2px solid black;
`;
interface Props {
  boxScore: SinglePlayerBoxType[];
  total: SinglePlayerBoxType;
  average: SinglePlayerBoxType;
}

const BoxScore: React.FC<Props> = ({ boxScore, total, average }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: singlePlayerColumns,
    data: boxScore,
  });

  return (
    <StyledTable {...getTableProps()}>
      <colgroup>
        <col span={5} />
        <StyledCol />
        <col span={2} />
        <StyledCol span={3} />
      </colgroup>
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
                      return <StyledHeader>{column.render('Header')}</StyledHeader>;
                    default:
                      return <StyledHeader>{column.render('Header')}</StyledHeader>;
                  }
                })
              }
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        <tr>
          <StyledCell>Total</StyledCell>
          <StyledCell></StyledCell>
          <StyledCell></StyledCell>
          <StyledCell></StyledCell>
          <StyledCell>{total.points}</StyledCell>
          <StyledSplitCell>
            <ReboundCell value={total.rebounds} />
          </StyledSplitCell>
          <StyledCell>{total.assists}</StyledCell>
          <StyledCell>{total.turnovers}</StyledCell>
          <StyledSplitCell>
            <ShootingCell value={total.fieldGoal} />
          </StyledSplitCell>
          <StyledSplitCell>
            <ShootingCell value={total.threePoints} />
          </StyledSplitCell>
          <StyledSplitCell>
            <ShootingCell value={total.freeThrows} />
          </StyledSplitCell>
          <StyledCell>{total.steals}</StyledCell>
          <StyledCell>{total.blocks}</StyledCell>
          <StyledCell>{total.fouls}</StyledCell>
          <StyledCell>{total.minutes}</StyledCell>
          <StyledCell>{total.gameScore}</StyledCell>
          <StyledCell>{total.positions}</StyledCell>
        </tr>
        <tr>
          <StyledCell>Average</StyledCell>
          <StyledCell></StyledCell>
          <StyledCell></StyledCell>
          <StyledCell></StyledCell>
          <StyledCell>{average.points}</StyledCell>
          <StyledSplitCell>
            <ReboundCell value={average.rebounds} />
          </StyledSplitCell>
          <StyledCell>{average.assists}</StyledCell>
          <StyledCell>{average.turnovers}</StyledCell>
          <StyledSplitCell>
            <ShootingCell value={average.fieldGoal} />
          </StyledSplitCell>
          <StyledSplitCell>
            <ShootingCell value={average.threePoints} />
          </StyledSplitCell>
          <StyledSplitCell>
            <ShootingCell value={average.freeThrows} />
          </StyledSplitCell>
          <StyledCell>{average.steals}</StyledCell>
          <StyledCell>{average.blocks}</StyledCell>
          <StyledCell>{average.fouls}</StyledCell>
          <StyledCell>{average.minutes}</StyledCell>
          <StyledCell>{average.gameScore}</StyledCell>
          <StyledCell>{average.positions}</StyledCell>
        </tr>
        {rows.map((row) => {
          prepareRow(row);

          return (
            // Apply the row props
            <tr {...row.getRowProps()}>
              {
                // Loop over the rows cells
                row.cells.map((cell) => {
                  // Apply the cell props
                  switch (cell.column.Header) {
                    case '日期':
                      return (
                        <StyledCell {...cell.getCellProps()}>
                          <Link to={`/match/show/${cell.value.id}`}>{cell.value.date}</Link>
                        </StyledCell>
                      );
                    case '籃板':
                      return (
                        <StyledSplitCell {...cell.getCellProps()}>
                          <ReboundCell value={cell.value} />
                        </StyledSplitCell>
                      );
                    case 'FG':
                    case '3PT':
                    case 'FT':
                      return (
                        <StyledSplitCell {...cell.getCellProps()}>
                          <ShootingCell value={cell.value} />
                        </StyledSplitCell>
                      );
                    default:
                      return (
                        <StyledCell {...cell.getCellProps()}>
                          <span>{cell.value}</span>
                        </StyledCell>
                      );
                  }
                })
              }
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default BoxScore;
