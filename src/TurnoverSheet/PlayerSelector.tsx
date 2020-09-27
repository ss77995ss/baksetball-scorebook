import React, { useState } from 'react';
import { update, reject } from 'ramda';
import { defaultPlayers } from './constants';

const PlayerSelector: React.FC = () => {
  const [onCourt, setOnCourt] = useState(defaultPlayers.slice(0, 5));
  const [selectedPlayer, setSelectedPlayer] = useState(onCourt[0]);
  const [selectorStatus, setSelectorStatus] = useState<'更換先發' | '確認更換'>('更換先發');
  const excludedOnCourt = reject(n => onCourt.includes(n), defaultPlayers);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedPlayer(parseInt(event.target.value, 10));
  };

  const handleSelect = (index: number) => (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = parseInt(event.target.value, 10);

    setOnCourt(update(index, selectedValue, onCourt));
    setSelectedPlayer(selectedValue);
  };

  const handleClick = (): void => {
    switch (selectorStatus) {
      case '更換先發':
        setSelectorStatus('確認更換');
        break;
      case '確認更換':
        setSelectorStatus('更換先發');
        break;
      default:
        throw new Error('Wrong selector status');
    }
  };

  return (
    <section>
      {selectorStatus === '更換先發'
        ? onCourt.map(player => (
            <>
              <input
                key={`player-on-court-#${player}`}
                type="radio"
                id={`#${player}`}
                name="playerNumber"
                value={player}
                onChange={handleCheck}
                checked={player === selectedPlayer}
              />
              <label htmlFor={`#${player}`}>{player}</label>
            </>
          ))
        : onCourt.map((onCourtPlayer, index) => (
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
      <button type="button" onClick={handleClick}>
        {selectorStatus}
      </button>
    </section>
  );
};

export default PlayerSelector;
