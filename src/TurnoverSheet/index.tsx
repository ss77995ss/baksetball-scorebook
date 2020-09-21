import React, { useState } from 'react';
import styled from 'styled-components';
import DisplayTable from './DisplayTable';
import EditMode from './EditMode';

const StyledButtonSection = styled.section`
  text-align: center;

  button {
    margin: 12px;
  }
`;

const TurnoverSheet: React.FC = () => {
  const [mode, setMode] = useState('編輯');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>
    setMode(event.currentTarget.value);

  return (
    <section>
      <StyledButtonSection>
        <button type="button" value="編輯" onClick={handleClick}>
          編輯
        </button>
        <button type="button" value="檢視" onClick={handleClick}>
          檢視
        </button>
      </StyledButtonSection>
      {mode === '編輯' ? <EditMode /> : <DisplayTable />}
    </section>
  );
};

export default TurnoverSheet;
