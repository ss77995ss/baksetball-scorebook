import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { update, reject } from 'ramda';
import { PlayerType } from '../../types';

interface Props {
  players: PlayerType[];
  onCourt: PlayerType[];
  setOnCourt: React.Dispatch<React.SetStateAction<PlayerType[]>>;
  register: UseFormRegisterReturn;
}

const PlayerSelector: React.FC<Props> = ({ players, onCourt, setOnCourt, register }: Props) => {
  const [selectedPlayer, setSelectedPlayer] = useState(onCourt[0]._id);
  const [selectorStatus, setSelectorStatus] = useState<'更換場上五人' | '確認更換'>('更換場上五人');
  const excludedOnCourt = reject((n) => onCourt.includes(n), players);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedPlayer(event.target.value);
  };

  const handleSelect = (index: number) => (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = event.target.value;
    const indexOfPlayer = players.findIndex((player) => player._id === selectedValue);
    const selectedPlayer = players[indexOfPlayer];

    setOnCourt(update(index, selectedPlayer, onCourt));
    setSelectedPlayer(selectedValue);
  };

  const handleClick = (): void => {
    switch (selectorStatus) {
      case '更換場上五人': {
        setSelectorStatus('確認更換');
        setSelectedPlayer('');
        break;
      }
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
        ? onCourt.map((player) => (
            <>
              <input
                {...register}
                key={`player-on-court-#${player}`}
                type="radio"
                id={`#${player._id}`}
                value={player._id}
                onChange={handleCheck}
                checked={player._id === selectedPlayer}
              />
              <label htmlFor={`#${player._id}`}>{player.name}</label>
            </>
          ))
        : onCourt.map((onCourtPlayer, index) => (
            <select
              key={`select-on-court-player-${onCourtPlayer._id}`}
              onChange={handleSelect(index)}
              defaultValue={onCourtPlayer._id}
            >
              {[onCourtPlayer, ...excludedOnCourt].map((player) => (
                <option key={`remain-${player._id}`} value={player._id}>
                  {player.name}
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
