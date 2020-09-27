import React from 'react';
import styled from 'styled-components';
import { update, propEq, findIndex, prop, append, remove } from 'ramda';
import PlayerSelector from './PlayerSelector';
import TurnoverCategoriesSelector from './TurnoverCategoriesSelector';
import { TurnoverCategoriesType, StatHistoryType } from './types';

const StyledEditModeRoot = styled.section`
  text-align: center;
  padding-bottom: 28px;
`;

const StyledList = styled.ul`
  padding: 0;
  list-style-type: none;

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

    setTurnoverData(prev => {
      const index = findIndex(propEq('playerNumber', parseInt(playerNumber.value, 10)))(prev);
      const targetPlayer = prop(turnoverCategory.value, prev[index]);

      if (!turnoverSubCategory) {
        const newData = {
          ...prev[index],
          [turnoverCategory.value]: targetPlayer + 1,
          total: prev[index]['total'] + 1,
        };

        return update(index, newData, prev);
      }

      const targetNumber = prop(turnoverSubCategory.value, targetPlayer);

      const newData = {
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
      append(
        {
          playerNumber: playerNumber.value,
          turnoverCategory: turnoverCategory.value,
          turnoverSubCategory: turnoverSubCategory ? turnoverSubCategory.value : undefined,
        },
        statHistory,
      ),
    );
  };

  const handleClick = (stat: StatHistoryType, index: number) => (): void => {
    const { playerNumber, turnoverCategory, turnoverSubCategory } = stat;

    setTurnoverData(prev => {
      const index = findIndex(propEq('playerNumber', parseInt(playerNumber, 10)))(prev);
      const targetPlayer = prop(turnoverCategory, prev[index]);

      if (typeof targetPlayer === 'number') {
        const newData = {
          ...prev[index],
          [turnoverCategory]: targetPlayer - 1,
          total: prev[index]['total'] - 1,
        };

        return update(index, newData, prev);
      }

      if (turnoverSubCategory) {
        const targetNumber = prop(turnoverSubCategory, targetPlayer);

        const newData = {
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
          {statHistory.map(({ playerNumber, turnoverCategory, turnoverSubCategory }, index) => (
            <li
              key={`history-#${index}`}
              onClick={handleClick({ playerNumber, turnoverCategory, turnoverSubCategory }, index)}
            >
              <span>
                {turnoverSubCategory
                  ? `#${playerNumber}: ${turnoverCategory} -> ${turnoverSubCategory}`
                  : `#${playerNumber}: ${turnoverCategory}`}
              </span>
            </li>
          ))}
        </StyledList>
      )}
    </StyledEditModeRoot>
  );
};

export default EditMode;
