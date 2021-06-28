import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { usePlayerResultsByTeam } from '../../hooks/useAPI';
import { PlayerResultsType } from '../../types';
import DeleteButton from './DeleteButton';

type FormDataType = {
  playerId: string;
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
  matchId: string;
  teamId: string;
  setValue: UseFormSetValue<PlayerResultsType>;
  setSelectedPlayer: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<'view' | 'edit'>>;
  setHasPlayerResults: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExistResults: React.FC<Props> = ({
  matchId,
  teamId,
  setValue,
  setSelectedPlayer,
  setMode,
  setHasPlayerResults,
}: Props) => {
  const { isLoading, error, playerResults } = usePlayerResultsByTeam(matchId, teamId);

  useEffect(() => {
    if (playerResults && playerResults.length > 0) {
      setHasPlayerResults(true);
    } else {
      setHasPlayerResults(false);
    }
  }, [playerResults]);

  const handleUpdateForm = (result: FormDataType) => () => {
    setValue('assists', result.assists);
    setValue('blocks', result.blocks);
    setValue('dRebounds', result.dRebounds);
    setValue('fouls', result.fouls);
    setValue('ftAttempts', result.ftAttempts);
    setValue('ftMades', result.ftMades);
    setValue('minutes', result.minutes);
    setValue('oRebounds', result.oRebounds);
    setValue('points', result.points);
    setValue('positions', result.positions);
    setValue('steals', result.steals);
    setValue('threeAttempts', result.threeAttempts);
    setValue('threeMades', result.threeMades);
    setValue('turnovers', result.turnovers);
    setValue('twoAttempts', result.twoAttempts);
    setValue('twoMades', result.twoMades);
    setValue('playerId', result.playerId);
    setSelectedPlayer(result.playerId);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{`An error has occurred: ${error}`}</div>;

  if (!playerResults) return <div>暫無資料</div>;

  return (
    <div>
      已有紀錄的球員：
      {playerResults.map((result) => (
        <div key={`exist-results-player-${result.player._id}`}>
          {result.player.name}
          <button onClick={handleUpdateForm(result)}>更新</button>
          <DeleteButton id={result._id} name={result.player.name} setMode={setMode} />
        </div>
      ))}
    </div>
  );
};

export default ExistResults;
