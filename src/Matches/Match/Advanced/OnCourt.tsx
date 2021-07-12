import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { PlayerType } from '../../types';
import PlayerSelector from './PlayerSelector';

// interface WrapperProps {
//   teamId: string;
//   register: UseFormRegisterReturn;
//   setValue: UseFormSetValue<FieldValues>;
// }

interface Props {
  players: PlayerType[];
  register: UseFormRegisterReturn;
}

const OnCourt: React.FC<Props> = ({ players, register }: Props) => {
  if (players.length < 5) return <div>球員需至少五個人</div>;
  const [onCourt, setOnCourt] = useState<PlayerType[]>(players.slice(0, 5));

  return (
    <div>
      <PlayerSelector register={register} players={players} onCourt={onCourt} setOnCourt={setOnCourt} />
    </div>
  );
};

export default OnCourt;
