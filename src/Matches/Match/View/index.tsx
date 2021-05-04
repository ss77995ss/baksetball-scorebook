import { getBoxScore } from '../../utils';
import { usePlayerResultsByTeam } from '../../hooks/useAPI';
import BoxScore from './BoxScore';
interface Props {
  id: string;
  selectedTeam: string;
}

const View: React.FC<Props> = ({ id, selectedTeam }: Props) => {
  const { isLoading, error, playerResults } = usePlayerResultsByTeam(id, selectedTeam);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{`An error has occurred: ${error}`}</div>;

  if (!playerResults) return <div>暫無資料</div>;

  const boxScore = getBoxScore(playerResults);
  return (
    <div>
      <BoxScore boxScore={boxScore} />
    </div>
  );
};

export default View;
