import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { usePlayersByTeams } from '../../hooks/useAPI';
import { MatchInfoType, PlayerType } from '../../types';
import { API_DOMAIN } from '../../constants';
import MatchInfo from '../View/MatchInfo';
import TeamButtons from '../View/TeamButtons';
import QuarterSelector from './QuarterSelector';
import OnCourt from './OnCourt';
import StatsSelector from './StatsSelector';
import PlayByPlays from './PlayByPlays';
import PlaysBox from './PlaysBox';

const StyledCenter = styled.div`
  text-align: center;

  button {
    margin: 4px;
  }
`;

interface Props {
  matchInfo: MatchInfoType;
  setMode: React.Dispatch<React.SetStateAction<'view' | 'edit'>>;
}

interface FormProps {
  matchId: string;
  selectedTeam: string;
  opponentTeam: string;
  players: PlayerType[];
}

const Form: React.FC<FormProps> = ({ matchId, selectedTeam, opponentTeam, players }: FormProps) => {
  const resolvedPlayers = players.filter((player) => player.teamId === selectedTeam);
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm();
  const { isLoading, isError, mutate } = useMutation(
    (formData: Record<string, string>) =>
      fetch(`${API_DOMAIN}/playByPlays`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('playByPlays');
      },
    },
  );

  const onSubmit = (newPlay: Record<string, string>) => {
    const { mainStat, subStat, ...rest } = newPlay;
    const statType = subStat ? subStat : mainStat;

    mutate({ ...rest, statType, teamId: selectedTeam, opponentTeamId: opponentTeam, matchId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <QuarterSelector register={register('quarter')} />
      <OnCourt register={register('playerId', { required: true })} players={resolvedPlayers} />
      <StatsSelector mainRegister={register('mainStat')} subRegister={register('subStat')} setValue={setValue} />
      <button type="submit" disabled={isLoading || resolvedPlayers.length < 5}>
        送出
      </button>
      {isError && <div>Something went wrong</div>}
    </form>
  );
};

const Edit: React.FC<Props> = ({ matchInfo, setMode }: Props) => {
  const [selectedTeam, setSelectedTeam] = useState(matchInfo.homeTeam._id);
  const { isLoading, error, players } = usePlayersByTeams(matchInfo.homeTeam._id, matchInfo.awayTeam._id);
  const opponentTeam = matchInfo.homeTeam._id === selectedTeam ? matchInfo.awayTeam._id : matchInfo.homeTeam._id;

  const handleSwitchTeam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelectedTeam(event.currentTarget.value);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      <MatchInfo matchInfo={matchInfo} />
      <TeamButtons matchInfo={matchInfo} handleSwitchTeam={handleSwitchTeam} />
      <StyledCenter>
        <button onClick={() => setMode('view')}>Box</button>
        <Form matchId={matchInfo._id} selectedTeam={selectedTeam} opponentTeam={opponentTeam} players={players} />
        <PlayByPlays players={players} matchId={matchInfo._id} />
      </StyledCenter>
    </div>
  );
};

const View: React.FC<Props> = ({ matchInfo, setMode }: Props) => {
  const [selectedTeam, setSelectedTeam] = useState(matchInfo.homeTeam._id);

  const handleSwitchTeam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelectedTeam(event.currentTarget.value);
  };

  return (
    <div>
      <MatchInfo matchInfo={matchInfo} />
      <TeamButtons matchInfo={matchInfo} handleSwitchTeam={handleSwitchTeam} />
      <StyledCenter>
        <button onClick={() => setMode('edit')}>Box</button>
        <PlaysBox matchInfo={matchInfo} selectedTeam={selectedTeam} />
      </StyledCenter>
    </div>
  );
};

const Advanced: React.FC<{ matchInfo: MatchInfoType }> = ({ matchInfo }: { matchInfo: MatchInfoType }) => {
  const [mode, setMode] = useState<'view' | 'edit'>('edit');

  return (
    <>
      {mode === 'view' ? (
        <View matchInfo={matchInfo} setMode={setMode} />
      ) : (
        <Edit matchInfo={matchInfo} setMode={setMode} />
      )}
    </>
  );
};

export default Advanced;
