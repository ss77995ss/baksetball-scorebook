import { useParams } from 'react-router-dom';
import { usePlayerInfo } from '../../../hooks/useAPI';
import PlayerStats from './PlayerStats';

const SinglePlayerBox: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isFetching, error, playerInfo } = usePlayerInfo(id);

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>{`An error has occurred: ${error}`}</div>;

  if (!playerInfo) return <div>暫無資料</div>;

  return (
    <div>
      <PlayerStats playerInfo={playerInfo} />
    </div>
  );
};

export default SinglePlayerBox;
