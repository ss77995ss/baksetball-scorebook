import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { usePlayers } from '../../hooks/useAPI';
import { PlayerType } from '../../types';
import PlayerSelector from './PlayerSelector';

interface WrapperProps {
  teamId: string;
  register: UseFormRegisterReturn;
}

interface Props {
  players: PlayerType[];
  register: UseFormRegisterReturn;
}

const OnCourtWrapper: React.FC<WrapperProps> = ({ teamId, register }: WrapperProps) => {
  const { isLoading, error, players } = usePlayers(teamId);
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{`Something went wrong: ${error}`}</div>;

  if (!players) return <div>No Players</div>;

  if (players.length < 5) return <div>球員需至少五個人</div>;
  return <OnCourt register={register} players={players} />;
};

const OnCourt: React.FC<Props> = ({ players, register }: Props) => {
  const [onCourt, setOnCourt] = useState<PlayerType[]>(players.slice(0, 5));

  return (
    <div>
      <PlayerSelector register={register} players={players} onCourt={onCourt} setOnCourt={setOnCourt} />
    </div>
  );
};

export default OnCourtWrapper;
