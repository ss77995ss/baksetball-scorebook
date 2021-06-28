import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { PlayerResultsType, MatchInfoType } from '../../types';
import { API_DOMAIN } from '../../constants';
import { defaultStats } from '../../constants';
import PlayerSelector from './PlayerSelector';
import TeamSelector from './TeamSelector';
import StatsForm from './StatsForm';
import ExistResults from './ExistResults';
import UpdateForm from './UpdateForm';
import DeleteMatchButton from './DeleteMatchButton';

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  text-align: center;

  input,
  div {
    margin: 2px 0;
  }
`;

const StyledLinks = styled.section`
  text-align: center;

  button {
    margin: 8px 4px;
  }
`;

type FormDataType = {
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
  selectedTeam: string;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<'view' | 'edit'>>;
}

const Edit: React.FC<Props> = ({ matchInfo, selectedTeam, setSelectedTeam, setMode }: Props) => {
  const { _id, homeTeam, awayTeam } = matchInfo;
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [hasPlayerResults, setHasPlayerResults] = useState(false);
  const { register, handleSubmit, setValue } = useForm<PlayerResultsType>({
    defaultValues: {
      ...defaultStats,
      minutes: 0.0,
    },
  });

  const { isLoading, error, mutate } = useMutation(
    (formData: FormDataType & { playerId: string; matchId: string; teamId: string; opponentTeamId: string }) =>
      fetch(`${API_DOMAIN}/playerResults`, {
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
      <UpdateForm matchInfo={matchInfo} setMode={setMode} hasPlayerResults={hasPlayerResults} />
      <StyledLinks>
        <DeleteMatchButton matchId={matchInfo._id} />
        <button onClick={() => setMode('view')}>返回</button>
        <Link to="/match/teams">
          <button>編輯隊伍</button>
        </Link>
        <Link to="/match/players">
          <button>編輯球員名單</button>
        </Link>
      </StyledLinks>
      <StyledSection>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TeamSelector
            register={register}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
          />
          <PlayerSelector register={register} teamId={selectedTeam} setSelectedPlayer={setSelectedPlayer} />
          <StatsForm register={register} />
          <button type="submit" disabled={isLoading}>
            新增球員紀錄
          </button>
        </form>
        <ExistResults
          matchId={_id}
          teamId={selectedTeam}
          setValue={setValue}
          setSelectedPlayer={setSelectedPlayer}
          setMode={setMode}
          setHasPlayerResults={setHasPlayerResults}
        />
      </StyledSection>
    </div>
  );
};

export default Edit;
