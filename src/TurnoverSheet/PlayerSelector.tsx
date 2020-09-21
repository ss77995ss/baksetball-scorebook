import React, { useState } from 'react';
import { update, reject } from 'ramda';
import { defaultPlayers } from './constants';

const PlayerSelector: React.FC = () => {
  const [onCourt, setOnCourt] = useState(defaultPlayers.slice(0, 5));
  const [selectedPlayer, setSelectedPlayer] = useState(onCourt[0]);
  const excludedOnCourt = reject(n => onCourt.includes(n), defaultPlayers);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedPlayer(parseInt(event.target.value, 10));
  };

  const handleSelect = (index: number) => (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = parseInt(event.target.value, 10);

    setOnCourt(update(index, selectedValue, onCourt));
    setSelectedPlayer(selectedValue);
  };

  return (
    <section>
      <p>{`Selected Player: ${selectedPlayer}`}</p>
      {onCourt.map(player => (
        <>
          <input
            key={`player-on-court-#${player}`}
            type="radio"
            name={`#${player}`}
            value={player}
            onChange={handleCheck}
            checked={player === selectedPlayer}
          />
          <label htmlFor={`#${player}`}>{player}</label>
        </>
      ))}
      {onCourt.map((onCourtPlayer, index) => (
        <select
          key={`select-on-court-player-${onCourtPlayer}`}
          onChange={handleSelect(index)}
          defaultValue={onCourtPlayer}
        >
          {[onCourtPlayer, ...excludedOnCourt].map(player => (
            <option key={`remain-${player}`} value={player}>
              {player}
            </option>
          ))}
        </select>
      ))}
    </section>
  );
};

export default PlayerSelector;
