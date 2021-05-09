import styled from 'styled-components';
import { usePlayerResultsByPlayer } from '../../../hooks/useAPI';
import { getSinglePlayerBoxScore, getSinglePlayerTotal, getAverage } from '../../../utils';
import { PlayerType } from '../../../types';
import BoxScore from './BoxScore';

const StyledPlayerInfo = styled.section`
  text-align: center;

  span {
    padding: 4px;
  }
`;

const PlayerStats: React.FC<{ playerInfo: PlayerType }> = ({ playerInfo }: { playerInfo: PlayerType }) => {
  const { isLoading, error, playerResults } = usePlayerResultsByPlayer(playerInfo._id);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{`An error has occurred: ${error}`}</div>;

  if (!playerResults) return <div>暫無資料</div>;

  const totalStats = getSinglePlayerTotal(playerResults);
  const totalRow = getSinglePlayerBoxScore([totalStats])[0];
  const averageRow = getSinglePlayerBoxScore([getAverage(totalStats, playerResults.length)])[0];

  return (
    <div>
      <StyledPlayerInfo>
        <span>{`#${playerInfo.number}`}</span>
        <span>{playerInfo.name}</span>
        <span>{`場次：${playerResults.length}`}</span>
      </StyledPlayerInfo>
      <BoxScore boxScore={getSinglePlayerBoxScore(playerResults)} total={totalRow} average={averageRow} />
    </div>
  );
};

export default PlayerStats;
