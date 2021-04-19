import { usePlayers } from '../hooks/useAPI';

const PlayerList: React.FC<{ teamId: string }> = ({ teamId }: { teamId: string }) => {
  const { isLoading, error, players } = usePlayers(teamId);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!players) return null;

  return <div>{JSON.stringify(players)}</div>;
};

export default PlayerList;
