/* eslint-disable react/jsx-key */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { usePlayerResultsByTeam } from '../../hooks/useAPI';
import { BoxType } from '../../types';
import { getBoxScore } from '../../utils';
import { columns } from '../../constants';
import ReboundHeader from './ReboundHeader';
import ShootingHeader from './ShootingHeader';
import ReboundCell from './ReboundCell';
import ShootingCell from './ShootingCell';

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
  boxScore: BoxType[];
}

export const BoxScore: React.FC<Props> = ({ boxScore }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
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
                      return <ShootingHeader shootingType={column.Header } />;
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
                    case '名字':
                      return (
                        <StyledCell {...cell.getCellProps()}>
                          <Link to={`/match/player/${cell.value.id}`}>{cell.value.name}</Link>
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

const BoxScoreWrapper: React.FC<{ id: string; selectedTeam: string }> = ({
  id,
  selectedTeam,
}: {
  id: string;
  selectedTeam: string;
}) => {
  const { isLoading, isFetching, error, playerResults } = usePlayerResultsByTeam(id, selectedTeam);

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>{`An error has occurred: ${error}`}</div>;

  if (!playerResults) return <div>暫無資料</div>;

  const boxScore = getBoxScore(playerResults);

  return (
    <div>
      <BoxScore boxScore={boxScore} />
    </div>
  );
};

export default BoxScoreWrapper;
