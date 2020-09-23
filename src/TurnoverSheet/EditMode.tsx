import React from 'react';
import styled from 'styled-components';
import { update, propEq, findIndex, prop } from 'ramda';
import PlayerSelector from './PlayerSelector';
import TurnoverCategoriesSelector from './TurnoverCategoriesSelector';
import { TurnoverCategoriesType } from './types';

const StyledEditModeRoot = styled.section`
  text-align: center;
  padding-bottom: 28px;
`;

interface Props {
  setTurnoverData: React.Dispatch<React.SetStateAction<TurnoverCategoriesType[]>>;
}

const EditMode: React.FC<Props> = ({ setTurnoverData }: Props) => {
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
  };

  return (
    <StyledEditModeRoot>
      <form onSubmit={handleSubmit}>
        <PlayerSelector />
        <TurnoverCategoriesSelector />
        <input type="submit" value="送出" />
      </form>
    </StyledEditModeRoot>
  );
};

export default EditMode;
