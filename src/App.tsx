import React, { useState } from 'react';
import { StatsProvider } from './hooks/statData';
import { DEFAULT_TEAM_NAME } from './constants';
import EditMode from './EditMode';
import ViewMode from './ViewMode';

const App: React.FC = () => {
  const [teamName, setTeamName] = useState(DEFAULT_TEAM_NAME);
  const [mode, setMode] = useState('編輯');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>
    setMode(event.currentTarget.value);

  return (
    <StatsProvider>
      <div style={{ textAlign: 'center' }}>
        <button type="button" value="編輯" onClick={handleClick}>
          編輯
        </button>
        <button type="button" value="檢視" onClick={handleClick}>
          檢視
        </button>
      </div>
      {mode === '編輯' ? <EditMode teamName={teamName} setTeamName={setTeamName} /> : <ViewMode teamName={teamName} />}
    </StatsProvider>
  );
};

export default App;
