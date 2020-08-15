import React, { useState } from 'react';
import StatsTable from './StatsTable';
import { StatsProvider } from './hooks/statData';

const App: React.FC = () => {
  const [team, setTeam] = useState('台大');

  const handleCheck: (event: { target: HTMLInputElement }) => void = event => setTeam(event.target.value);

  return (
    <StatsProvider>
      <div style={{ textAlign: 'center' }}>
        <input type="radio" id="ntu" name="team" value="台大" onChange={handleCheck} defaultChecked />
        <label htmlFor="ntu">台大</label>
        <input type="radio" id="two" name="team" value="對手" onChange={handleCheck} />
        <label htmlFor="opponent">對手</label>
        <p>{`Current: ${team}`}</p>
      </div>
      <div>
        <StatsTable team={team === '台大' ? 'ntu' : 'opponent'} />
      </div>
    </StatsProvider>
  );
};

export default App;
