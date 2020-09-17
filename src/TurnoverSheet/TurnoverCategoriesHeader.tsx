import React from 'react';
import styled from 'styled-components';
import { TURNOVER_SUB_CATEGORIES_NAME } from './constants';

const StyledMainHeader = styled.section`
  border-bottom: 1px solid black;
  padding: 4px 0;
`;

const StyledSubHeader = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0;

  li {
    font-size: 12px;
    width: 48px;
    padding: 4px 8px;

    :first-child {
      border-right: 1px solid black;
    }

    :last-child {
      border-left: 1px solid black;
    }
  }
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
