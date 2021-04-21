import { usePlayers } from '../hooks/useAPI';
import Player from './Player';
import NewPlayer from './NewPlayer';

const PlayerList: React.FC<{ teamId: string }> = ({ teamId }: { teamId: string }) => {
  const { isLoading, error, players } = usePlayers(teamId);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!players) return null;

  return (
    <div>
      {players.length > 0 ? (
        <>
          <NewPlayer teamId={teamId} />
          {players.map((player) => (
            <Player key={player._id} player={player} />
          ))}
        </>
      ) : (
        '目前無球員'
      )}
    </div>
  );
};

export default PlayerList;
