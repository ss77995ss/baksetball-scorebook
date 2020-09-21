import React from 'react';
import { StyledSubHeader } from '../styles';
import { TurnoverSubCategoriesType } from './types';

interface Props {
  value: TurnoverSubCategoriesType;
}

const TurnoverCell: React.FC<Props> = ({ value }: Props) => {
  const { directTrans, deadBall, missPoints } = value;

  return (
    <>
      <StyledSubHeader>
        <li>{directTrans}</li>
        <li>{deadBall}</li>
        <li>{missPoints}</li>
      </StyledSubHeader>
    </>
  );
};

export default TurnoverCell;
