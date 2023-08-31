import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { PlayerResultsType, MatchInfoType } from '../../types';
import { API_DOMAIN } from '../../constants';
import { defaultStats } from '../../constants';
import MatchInfo from '../View/MatchInfo';
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

  const onSubmit = (data: PlayerResultsType) => {
    if (!selectedPlayer) return alert('請選取球員');

    mutate({
      playerId: selectedPlayer,
      teamId: selectedTeam,
      points: data.points,
      assists: data.assists,
      blocks: data.blocks,
      dRebounds: data.dRebounds,
      fouls: data.fouls,
      ftAttempts: data.ftAttempts,
      ftMades: data.ftMades,
      oRebounds: data.oRebounds,
      positions: data.positions,
      steals: data.steals,
      threeAttempts: data.threeAttempts,
      threeMades: data.threeMades,
      turnovers: data.turnovers,
      twoAttempts: data.twoAttempts,
      twoMades: data.twoMades,
      minutes: data.minutes,
      opponentTeamId: data.teamId === awayTeam._id ? homeTeam._id : awayTeam._id,
      matchId: _id,
    });
  };

  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      {hasPlayerResults ? <MatchInfo matchInfo={matchInfo} /> : <UpdateForm matchInfo={matchInfo} setMode={setMode} />}
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
