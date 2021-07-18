import { groupBy } from 'ramda';
import { usePlayByPlays } from '../../../hooks/useAPI';
import { PlayByPlayType, MatchInfoType } from '../../../types';
import { getPlayerResultsByPlays, getBoxScore } from '../../../utils';
import { BoxScore } from '../../View/BoxScore';

const groupPlaysByTeams = groupBy((play: PlayByPlayType) => play.teamId);

const groupPlaysByPlayers = groupBy((play: PlayByPlayType) => play.playerId);

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
      {resolvedPlays[selectedTeam] ? <PlaysBox playByPlays={resolvedPlays[selectedTeam]} /> : <div>尚無資料</div>}
    </div>
  );
};

const PlaysBox: React.FC<{ playByPlays: PlayByPlayType[] }> = ({ playByPlays }: { playByPlays: PlayByPlayType[] }) => {
  const playerResults = Object.values(groupPlaysByPlayers(playByPlays)).map((value) => {
    return getPlayerResultsByPlays(value);
  });
  const boxScore = getBoxScore(playerResults);

  return (
    <div>
      <BoxScore boxScore={boxScore} />
    </div>
  );
};

export default PlaysBoxWrapper;
