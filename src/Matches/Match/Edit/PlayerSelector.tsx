import { useEffect } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { PlayerResultsType } from '../../types';
import { usePlayers } from '../../hooks/useAPI';

interface Props {
  register: UseFormRegister<PlayerResultsType>;
  teamId: string;
  setSelectedPlayer: React.Dispatch<React.SetStateAction<string>>;
}

const PlayerSelector: React.FC<Props> = ({ register, teamId, setSelectedPlayer }: Props) => {
  const { isLoading, error, players } = usePlayers(teamId);
  const handleChangePlayer = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedPlayer(event.target.value);

  useEffect(() => {
    setSelectedPlayer('');
  }, [teamId]);

  if (error) return <div>Something went wrong</div>;

  if (isLoading)
    return (
      <div>
        <select key="player-result-form-loading" {...register('playerId')}>
          <option>...isLoading</option>
        </select>
      </div>
    );

  return (
    <div>
      <select {...register('playerId')} onChange={handleChangePlayer}>
        <option selected></option>
        {players.length > 0
          ? players.map((player) => (
              <option key={`player-option-${player._id}`} value={player._id}>
                {player.name}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default PlayerSelector;
