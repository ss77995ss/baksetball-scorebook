import { usePlayByPlays } from '../../hooks/useAPI';
import { quarterNames } from '../../constants';

const PlayByPlays: React.FC<{ matchId: string }> = ({ matchId }: { matchId: string }) => {
  const { isLoading, error, playByPlays } = usePlayByPlays(matchId);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!playByPlays) return <div>目前無資料</div>;

  return (
    <div>
      {playByPlays.map((play) => (
        <div key={`play-by-play-${play._id}`}>{`Team: ${play.team.name} Player: ${play.player.name} ${
          quarterNames[play.quarter]
        } ${play.statType}`}</div>
      ))}
    </div>
  );
};

export default PlayByPlays;
