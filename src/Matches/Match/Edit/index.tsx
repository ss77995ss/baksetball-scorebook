import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { PlayerResultsType, MatchInfoType } from '../../types';
import { defaultStats } from '../../constants';
import PlayerSelector from './PlayerSelector';
import TeamSelector from './TeamSelector';
import StatsForm from './StatsForm';

type FormDataType = {
  matchId: string;
  playerId: string;
  teamId: string;
  opponentTeamId: string;
  assists: number;
  blocks: number;
  dRebounds: number;
  fouls: number;
  ftAttempts: number;
  ftMades: number;
  minutes: number;
  oRebounds: number;
  points: number;
  positions: number;
  steals: number;
  threeAttempts: number;
  threeMades: number;
  turnovers: number;
  twoAttempts: number;
  twoMades: number;
};

interface Props {
  matchInfo: MatchInfoType;
  setMode: React.Dispatch<React.SetStateAction<'view' | 'edit'>>;
}

const Edit: React.FC<Props> = ({ matchInfo, setMode }: Props) => {
  const { _id, homeTeam, awayTeam } = matchInfo;
  const [selectedTeam, setSelectedTeam] = useState(homeTeam._id);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const { register, handleSubmit } = useForm<PlayerResultsType>({ defaultValues: { ...defaultStats, minutes: 0.0 } });

  const { isLoading, error, mutate } = useMutation(
    (formData: FormDataType) =>
      fetch('http://localhost:8080/playerResults', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => {
        setMode('view');
      },
    },
  );

  const onSubmit = (data: Record<string, string>) => {
    if (!selectedPlayer) return alert('請選取球員');

    console.log(data);

    mutate({
      playerId: selectedPlayer,
      teamId: selectedTeam,
      points: parseInt(data.points, 10),
      assists: parseInt(data.assists, 10),
      blocks: parseInt(data.blocks, 10),
      dRebounds: parseInt(data.dRebounds, 10),
      fouls: parseInt(data.fouls, 10),
      ftAttempts: parseInt(data.ftAttempts, 10),
      ftMades: parseInt(data.ftMades, 10),
      oRebounds: parseInt(data.oRebounds, 10),
      positions: parseInt(data.positions, 10),
      steals: parseInt(data.steals, 10),
      threeAttempts: parseInt(data.threeAttempts, 10),
      threeMades: parseInt(data.threeMades, 10),
      turnovers: parseInt(data.turnovers, 10),
      twoAttempts: parseInt(data.twoAttempts, 10),
      twoMades: parseInt(data.twoMades, 10),
      minutes: parseFloat(data.minutes),
      opponentTeamId: data.teamId === awayTeam._id ? homeTeam._id : awayTeam._id,
      matchId: _id,
    });
  };

  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      {_id}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TeamSelector register={register} homeTeam={homeTeam} awayTeam={awayTeam} setSelectedTeam={setSelectedTeam} />
        <PlayerSelector register={register} teamId={selectedTeam} setSelectedPlayer={setSelectedPlayer} />
        <StatsForm register={register} />
        <button type="submit" disabled={isLoading}>
          新增球員紀錄
        </button>
      </form>
    </div>
  );
};

export default Edit;
