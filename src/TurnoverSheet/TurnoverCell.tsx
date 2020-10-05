import React from 'react';
import styled from 'styled-components';
import { TurnoverSubCategoriesType } from './types';

interface Props {
  value: TurnoverSubCategoriesType;
}

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0;

  li {
    font-size: 12px;
    width: 25%;

    border-right: 1px solid black;

    :last-child {
      border: none;
    }
  }
`;

const TurnoverCell: React.FC<Props> = ({ value }: Props) => {
  const { directTrans, deadBall, missPoints } = value;

  return (
    <>
      <StyledList>
        <li>{directTrans}</li>
        <li>{deadBall}</li>
        <li>{directTrans + deadBall}</li>
        <li>{missPoints}</li>
      </StyledList>
    </>
  );
};

export default TurnoverCell;
