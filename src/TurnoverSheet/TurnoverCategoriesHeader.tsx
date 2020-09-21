import React from 'react';
import styled from 'styled-components';
import { StyledSubHeader } from '../styles';
import { TURNOVER_SUB_CATEGORIES_NAME } from './constants';

const StyledMainHeader = styled.section`
  border-bottom: 1px solid black;
  padding: 4px 0;
`;

interface Props {
  passType: string | undefined | {};
}

const TurnoverCategoriesHeader: React.FC<Props> = ({ passType }: Props) => {
  const { DIRECT_TRANSITION, DEAD_BALL, MISS_POINTS } = TURNOVER_SUB_CATEGORIES_NAME;
  return (
    <>
      <StyledMainHeader>{passType}</StyledMainHeader>
      <StyledSubHeader>
        <li>{DIRECT_TRANSITION}</li>
        <li>{DEAD_BALL}</li>
        <li>{MISS_POINTS}</li>
      </StyledSubHeader>
    </>
  );
};

export default TurnoverCategoriesHeader;
