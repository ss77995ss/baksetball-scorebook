import React from 'react';
import { Row } from 'react-table';
import styled from 'styled-components';
import TurnoverCell from './TurnoverCell';
import { TurnoverCategoriesType } from './types';
import { initialSingleData } from './constants';

interface Props {
  rows: Row<TurnoverCategoriesType>[];
}

const StyledCells = styled.td`
  font-size: 12px;
  padding: 0;

  span,
  li {
    padding: 4px 8px;
  }
`;

const TurnoverTotalRow: React.FC<Props> = ({ rows }: Props) => {
  const turnoverTotalList = rows.reduce((list, row) => {
    const { values } = row;

    return {
      ...list,
      drop: {
        directTrans: list.drop.directTrans + values.drop.directTrans,
        deadBall: list.drop.deadBall + values.drop.deadBall,
        lostPoints: list.drop.lostPoints + values.drop.lostPoints,
      },
      nonOffensivePass: {
        directTrans: list.nonOffensivePass.directTrans + values.nonOffensivePass.directTrans,
        deadBall: list.nonOffensivePass.deadBall + values.nonOffensivePass.deadBall,
        lostPoints: list.nonOffensivePass.lostPoints + values.nonOffensivePass.lostPoints,
      },
      offensivePass: {
        directTrans: list.offensivePass.directTrans + values.offensivePass.directTrans,
        deadBall: list.offensivePass.deadBall + values.offensivePass.deadBall,
        lostPoints: list.offensivePass.lostPoints + values.offensivePass.lostPoints,
      },
      paintPass: {
        directTrans: list.paintPass.directTrans + values.paintPass.directTrans,
        deadBall: list.paintPass.deadBall + values.paintPass.deadBall,
        lostPoints: list.paintPass.lostPoints + values.paintPass.lostPoints,
      },
      others: list.others + values.others,
      totalTurnovers: list.totalTurnovers + values.totalTurnovers,
      totalLostPoints: list.totalLostPoints + values.totalLostPoints,
    };
  }, initialSingleData);

  return (
    <tr>
      {Object.keys(turnoverTotalList).map(key => {
        switch (key) {
          case 'drop':
          case 'nonOffensivePass':
          case 'offensivePass':
          case 'paintPass':
            return (
              <StyledCells>
                <TurnoverCell value={turnoverTotalList[key]} />
              </StyledCells>
            );
          case 'playerName':
          case 'others':
          case 'totalTurnovers':
          case 'totalLostPoints':
            return (
              <StyledCells>
                <span>{turnoverTotalList[key]}</span>
              </StyledCells>
            );
          default:
            throw new Error('Invalid key');
        }
      })}
    </tr>
  );
};

export default TurnoverTotalRow;
