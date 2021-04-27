import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMatchInfo } from '../hooks/useAPI';
import View from './View';
import Edit from './Edit';

const Match: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const { isLoading, error, matchInfo } = useMatchInfo(id);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{`An error has occurred: ${error}`}</div>;

  if (!matchInfo) return <div>有些問題</div>;

  return (
    <div>
      <div>
        <div>{`賽事類型：${matchInfo.type}`}</div>
        <div>{`比賽名稱：${matchInfo.name}`}</div>
        <div>{`主隊：${matchInfo.homeTeam.name} 客隊：${matchInfo.awayTeam.name}`}</div>
        <div>{`日期：${matchInfo.date}`}</div>
      </div>
      <div>
        <button onClick={() => setMode(mode === 'view' ? 'edit' : 'view')}>{mode === 'view' ? '編輯' : '返回'}</button>
      </div>
      <div>{mode === 'view' ? <View id={id} /> : <Edit matchInfo={matchInfo} setMode={setMode} />}</div>
    </div>
  );
};

export default Match;
