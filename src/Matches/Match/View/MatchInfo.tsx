import { MatchInfoType } from '../../types';
import { formatDate } from '../../utils';

const MatchInfo: React.FC<{ matchInfo: MatchInfoType }> = ({ matchInfo }: { matchInfo: MatchInfoType }) => {
  return (
    <div>
      <div>{`賽事類型：${matchInfo.type.name}`}</div>
      <div>{`比賽名稱：${matchInfo.name}`}</div>
      <div>{`主隊：${matchInfo.homeTeam.name} 客隊：${matchInfo.awayTeam.name}`}</div>
      <div>{`日期：${formatDate(new Date(matchInfo.date))}`}</div>
    </div>
  );
};

export default MatchInfo;
