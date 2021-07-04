import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { PlayByPlaysProvier, usePlayByPlaysState, usePlayByPlaysDispatch } from '../../hooks/usePlayByPlays';
import { MatchInfoType } from '../../types';
import { API_DOMAIN } from '../../constants';
import MatchInfo from '../View/MatchInfo';
import TeamButtons from '../View/TeamButtons';
import UpdateForm from '../Edit/UpdateForm';
import QuarterSelector from './QuarterSelector';
import OnCourt from './OnCourt';
import StatsSelector from './StatsSelector';
import PlayByPlays from './PlayByPlays';

interface Props {
  matchInfo: MatchInfoType;
}

interface EditProps {
  matchInfo: MatchInfoType;
  setMode: React.Dispatch<React.SetStateAction<'view' | 'edit'>>;
}

interface FormProps {
  matchId: string;
  selectedTeam: string;
  opponentTeam: string;
}

const Form: React.FC<FormProps> = ({ matchId, selectedTeam, opponentTeam }: FormProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm();
  const { setPlayByPlays } = usePlayByPlaysDispatch();
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

    setPlayByPlays((prev) => [
      ...prev,
      { ...rest, statType, teamId: selectedTeam, opponentTeamId: opponentTeam, matchId },
    ]);
    mutate({ ...rest, statType, teamId: selectedTeam, opponentTeamId: opponentTeam, matchId });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <QuarterSelector register={register('quarter')} />
        <OnCourt teamId={selectedTeam} register={register('playerId', { required: true })} setValue={setValue} />
        <StatsSelector mainRegister={register('mainStat')} subRegister={register('subStat')} setValue={setValue} />
        <button type="submit" disabled={isLoading}>
          送出
        </button>
        {isError && <div>Something went wrong</div>}
      </form>
      <PlayByPlays matchId={matchId} />
    </>
  );
};

const Edit: React.FC<EditProps> = ({ matchInfo, setMode }: EditProps) => {
  const [selectedTeam, setSelectedTeam] = useState(matchInfo.homeTeam._id);
  const { playByPlays } = usePlayByPlaysState();
  const opponentTeam = matchInfo.homeTeam._id === selectedTeam ? matchInfo.awayTeam._id : matchInfo.homeTeam._id;

  const handleSwitchTeam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelectedTeam(event.currentTarget.value);
  };

  return (
    <div>
      {playByPlays.length > 0 ? (
        <MatchInfo matchInfo={matchInfo} />
      ) : (
        <UpdateForm matchInfo={matchInfo} setMode={setMode} />
      )}
      <TeamButtons matchInfo={matchInfo} handleSwitchTeam={handleSwitchTeam} />
      <Form matchId={matchInfo._id} selectedTeam={selectedTeam} opponentTeam={opponentTeam} />
    </div>
  );
};

const View: React.FC<Props> = ({ matchInfo }: Props) => {
  const [selectedTeam, setSelectedTeam] = useState(matchInfo.homeTeam._id);

  const handleSwitchTeam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelectedTeam(event.currentTarget.value);
  };

  return (
    <div>
      <MatchInfo matchInfo={matchInfo} />
      <TeamButtons matchInfo={matchInfo} handleSwitchTeam={handleSwitchTeam} />
      <div>{`Current Team: ${selectedTeam}`}</div>
    </div>
  );
};

const Advanced: React.FC<Props> = ({ matchInfo }: Props) => {
  const [mode, setMode] = useState<'view' | 'edit'>('edit');

  return (
    <PlayByPlaysProvier>
      {mode === 'view' ? <View matchInfo={matchInfo} /> : <Edit matchInfo={matchInfo} setMode={setMode} />}
    </PlayByPlaysProvier>
  );
};

export default Advanced;
