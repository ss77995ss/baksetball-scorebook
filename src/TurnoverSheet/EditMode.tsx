import React from 'react';
import styled from 'styled-components';
import TurnoverCategoriesSelector from './TurnoverCategoriesSelector';

const StyledEditModeRoot = styled.section`
  text-align: center;
  padding-bottom: 28px;
`;

const EditMode: React.FC = () => {
  return (
    <StyledEditModeRoot>
      <TurnoverCategoriesSelector />
    </StyledEditModeRoot>
  );
};

export default EditMode;
