import React, { useState } from 'react';
import styled from 'styled-components';
import { StatsProvider } from './hooks/statData';
import { DEFAULT_TEAM_NAME } from './constants';
import EditMode from './EditMode';
import ViewMode from './ViewMode';

const StyledButtonSection = styled.div`
  text-align: center;

  button {
    margin: 12px;
  }
`;

const AdvancedStats: React.FC = () => {
  const [teamName, setTeamName] = useState(DEFAULT_TEAM_NAME);
  const [mode, setMode] = useState('編輯');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>
    setMode(event.currentTarget.value);

  return (
    <StatsProvider>
      <StyledButtonSection>
        <button type="button" value="編輯" onClick={handleClick}>
          編輯
        </button>
        <button type="button" value="檢視" onClick={handleClick}>
          檢視
        </button>
      </StyledButtonSection>
      {mode === '編輯' ? <EditMode teamName={teamName} setTeamName={setTeamName} /> : <ViewMode teamName={teamName} />}
    </StatsProvider>
  );
};

export default AdvancedStats;
