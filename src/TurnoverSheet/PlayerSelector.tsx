import React, { useState } from 'react';
import { update, reject } from 'ramda';

interface Props {
  playerList: string[];
}

const PlayerSelector: React.FC<Props> = ({ playerList }: Props) => {
  const [onCourt, setOnCourt] = useState(playerList.slice(0, 5));
  const [selectedPlayer, setSelectedPlayer] = useState(onCourt[0]);
  const [selectorStatus, setSelectorStatus] = useState<'更換場上五人' | '確認更換'>('更換場上五人');
  const excludedOnCourt = reject(n => onCourt.includes(n), playerList);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedPlayer(event.target.value);
  };

  const handleSelect = (index: number) => (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = event.target.value;

    setOnCourt(update(index, selectedValue, onCourt));
    setSelectedPlayer(selectedValue);
  };

  const handleClick = (): void => {
    switch (selectorStatus) {
      case '更換場上五人':
        setSelectorStatus('確認更換');
        break;
      case '確認更換':
        setSelectorStatus('更換場上五人');
        break;
      default:
        throw new Error('Wrong selector status');
    }
  };

  return (
    <section>
      {selectorStatus === '更換場上五人'
        ? onCourt.map(player => (
            <>
              <input
                key={`player-on-court-#${player}`}
                type="radio"
                id={`#${player}`}
                name="playerName"
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
