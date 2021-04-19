import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { PlayerResultsType } from '../types';
import { getBoxScore } from '../utils';
import BoxScore from './BoxScore';

const Match: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data: playerResults } = useQuery<PlayerResultsType[]>('playerResults', () =>
    fetch(`http://localhost:8080/playerResults/match?matchId=${id}`).then((res) => res.json()),
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{`An error has occurred: ${error}`}</div>;

  if (!playerResults) return <div>暫無資料</div>;

  const boxScore = getBoxScore(playerResults);

  return (
    <div>
      <div>{`This is match: ${id}`}</div>
      <div>
        <BoxScore boxScore={boxScore} />
      </div>
    </div>
  );
};

export default Match;
