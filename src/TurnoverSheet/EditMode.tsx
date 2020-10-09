import React from 'react';
import styled from 'styled-components';
import { update, propEq, findIndex, prop, prepend, remove } from 'ramda';
import PlayerSelector from './PlayerSelector';
import TurnoverCategoriesSelector from './TurnoverCategoriesSelector';
import { TurnoverCategoriesType, StatHistoryType } from './types';
import { TURNOVER_CATEGORIES_NAME, TURNOVER_SUB_CATEGORIES_NAME } from './constants';

const StyledEditModeRoot = styled.section`
  text-align: center;
  padding-bottom: 28px;
`;

const StyledList = styled.ul`
  padding: 0;
  list-style-type: none;
  max-height: 170px;
  overflow: auto;

  span {
    cursor: pointer;
  }
`;

interface Props {
  statHistory: StatHistoryType[];
  setTurnoverData: React.Dispatch<React.SetStateAction<TurnoverCategoriesType[]>>;
  setStatHistory: React.Dispatch<React.SetStateAction<StatHistoryType[]>>;
}

const EditMode: React.FC<Props> = ({ statHistory, setTurnoverData, setStatHistory }: Props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { playerNumber, turnoverCategory, turnoverSubCategory } = event.target as HTMLFormElement;

    if (turnoverSubCategory && turnoverSubCategory.value === 'missPoints') {
      const inputMissPoints = prompt('失分', '2');
      const resolvedMissPoints = inputMissPoints ? parseInt(inputMissPoints, 10) : 0;

      setTurnoverData(prev => {
        const index = findIndex(propEq('playerNumber', parseInt(playerNumber.value, 10)))(prev);
        const targetPlayer = prop(turnoverCategory.value, prev[index]);
        const targetNumber = prop(turnoverSubCategory.value, targetPlayer);
        const newData = {
          ...prev[index],
          [turnoverCategory.value]: {
            ...targetPlayer,
            directTrans: targetPlayer.directTrans + 1,
            [turnoverSubCategory.value]: targetNumber + resolvedMissPoints,
          },
          total: prev[index]['total'] + 1,
        };

        return update(index, newData, prev);
      });

      setStatHistory(
        prepend(
          {
            playerNumber: playerNumber.value,
            turnoverCategory: turnoverCategory.value,
            turnoverSubCategory: turnoverSubCategory ? turnoverSubCategory.value : undefined,
            value: resolvedMissPoints,
          },
          statHistory,
        ),
      );
    } else {
      setTurnoverData(prev => {
        const index = findIndex(propEq('playerNumber', parseInt(playerNumber.value, 10)))(prev);
        const targetPlayer = prop(turnoverCategory.value, prev[index]);
        let newData;

        if (!turnoverSubCategory) {
          newData = {
            ...prev[index],
            [turnoverCategory.value]: targetPlayer + 1,
            total: prev[index]['total'] + 1,
          };

          return update(index, newData, prev);
        }

        const targetNumber = prop(turnoverSubCategory.value, targetPlayer);

        newData = {
          ...prev[index],
          [turnoverCategory.value]: {
            ...targetPlayer,
            [turnoverSubCategory.value]: targetNumber + 1,
          },
          total: prev[index]['total'] + 1,
        };

        return update(index, newData, prev);
      });

      setStatHistory(
        prepend(
          {
            playerNumber: playerNumber.value,
            turnoverCategory: turnoverCategory.value,
            turnoverSubCategory: turnoverSubCategory ? turnoverSubCategory.value : undefined,
            value: 1,
          },
          statHistory,
        ),
      );
    }
  };

  const handleClick = (stat: StatHistoryType, index: number) => (): void => {
    const { playerNumber, turnoverCategory, turnoverSubCategory, value } = stat;

    setTurnoverData(prev => {
      const index = findIndex(propEq('playerNumber', parseInt(playerNumber, 10)))(prev);
      const targetPlayer = prop(turnoverCategory, prev[index]);
      let newData;

      if (typeof targetPlayer === 'number') {
        newData = {
          ...prev[index],
          [turnoverCategory]: targetPlayer - 1,
          total: prev[index]['total'] - 1,
        };

        return update(index, newData, prev);
      }

      if (turnoverSubCategory) {
        const targetNumber = prop(turnoverSubCategory, targetPlayer);

        newData =
          turnoverSubCategory === 'missPoints'
            ? {
                ...prev[index],
                [turnoverCategory]: {
                  ...targetPlayer,
                  directTrans: targetPlayer.directTrans - 1,
                  missPoints: targetPlayer.missPoints - value,
                },
                total: prev[index]['total'] - 1,
              }
            : {
                ...prev[index],
                [turnoverCategory]: {
                  ...targetPlayer,
                  [turnoverSubCategory]: targetNumber - 1,
                },
                total: prev[index]['total'] - 1,
              };

        return update(index, newData, prev);
      }

      return prev;
    });

    setStatHistory(prev => remove(index, 1, prev));
  };

  return (
    <StyledEditModeRoot>
      <form onSubmit={handleSubmit}>
        <PlayerSelector />
        <TurnoverCategoriesSelector />
        <input type="submit" value="送出" />
      </form>
      {statHistory && (
        <StyledList>
          {statHistory.map(({ playerNumber, turnoverCategory, turnoverSubCategory, value }, index) => (
            <li
              key={`history-#${index}`}
              onClick={handleClick({ playerNumber, turnoverCategory, turnoverSubCategory, value }, index)}
            >
              <span>
                {turnoverSubCategory
                  ? `#${playerNumber}: ${TURNOVER_CATEGORIES_NAME[turnoverCategory]} -> ${TURNOVER_SUB_CATEGORIES_NAME[turnoverSubCategory]}: ${value}`
                  : `#${playerNumber}: ${TURNOVER_CATEGORIES_NAME[turnoverCategory]}`}
              </span>
            </li>
          ))}
        </StyledList>
      )}
    </StyledEditModeRoot>
  );
};

export default EditMode;
