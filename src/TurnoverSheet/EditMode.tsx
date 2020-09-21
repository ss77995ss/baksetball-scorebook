import React from 'react';
import styled from 'styled-components';
import PlayerSelector from './PlayerSelector';
import TurnoverCategoriesSelector from './TurnoverCategoriesSelector';

const StyledEditModeRoot = styled.section`
  text-align: center;
  padding-bottom: 28px;
`;

const EditMode: React.FC = () => {
  return (
    <StyledEditModeRoot>
      <PlayerSelector />
      <TurnoverCategoriesSelector />
    </StyledEditModeRoot>
  );
};

export default EditMode;
