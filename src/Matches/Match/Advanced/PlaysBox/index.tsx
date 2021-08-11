import { groupBy } from 'ramda';
import { usePlayByPlays } from '../../../hooks/useAPI';
import usePlayerResultsByPlays from '../../../hooks/usePlayerResultsByPlays';
import { PlayByPlayType, MatchInfoType } from '../../../types';
import { getBoxScore } from '../../../utils';
import { BoxScore } from '../../View/BoxScore';
import CompleteButton from './CompleteButton';

const groupPlaysByTeams = groupBy((play: PlayByPlayType) => play.teamId);

interface Props {
  matchInfo: MatchInfoType;
  selectedTeam: string;
}

const PlaysBoxWrapper: React.FC<Props> = ({ matchInfo, selectedTeam }: Props) => {
  const { isLoading, error, playByPlays } = usePlayByPlays(matchInfo._id);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!playByPlays) return <div>無資料</div>;

  const resolvedPlays = groupPlaysByTeams(playByPlays);

  return (
    <div>
      {resolvedPlays[selectedTeam] ? (
        <PlaysBox matchId={matchInfo._id} playByPlays={resolvedPlays[selectedTeam]} />
      ) : (
        <div>尚無資料</div>
      )}
    </div>
  );
};

const PlaysBox: React.FC<{ matchId: string; playByPlays: PlayByPlayType[] }> = ({
  matchId,
  playByPlays,
}: {
  matchId: string;
  playByPlays: PlayByPlayType[];
}) => {
  const { playerResults } = usePlayerResultsByPlays(playByPlays);
  const boxScore = getBoxScore(playerResults);

  return (
    <div>
      <CompleteButton matchId={matchId} playerResults={playerResults} />
      <BoxScore boxScore={boxScore} />
    </div>
  );
};

export default PlaysBoxWrapper;
