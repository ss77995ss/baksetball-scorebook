import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMatchInfo } from '../hooks/useAPI';
import View from './View';
import Edit from './Edit';

const StyledLinks = styled.section`
  text-align: center;

  button {
    margin: 8px 4px;
  }
`;

const StyledButtons = styled.section`
  text-align: center;

  button {
    margin: 4px;
  }
`;

const Match: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const { isLoading, error, matchInfo } = useMatchInfo(id);
  const [selectedTeam, setSelectedTeam] = useState(matchInfo ? matchInfo.homeTeam._id : '');

  const handleSwitchTeam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelectedTeam(event.currentTarget.value);
  };

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
      <StyledLinks>
        <button onClick={() => setMode(mode === 'view' ? 'edit' : 'view')}>{mode === 'view' ? '編輯' : '返回'}</button>
        {mode === 'edit' && (
          <>
            <Link to="/match/teams">
              <button>編輯隊伍</button>
            </Link>
            <Link to="/match/players">
              <button>編輯球員名單</button>
            </Link>
          </>
        )}
      </StyledLinks>
      <div>
        {mode === 'view' ? (
          <>
            <StyledButtons>
              <button value={matchInfo.homeTeam._id} onClick={handleSwitchTeam}>
                {matchInfo.homeTeam.name}
              </button>
              <button value={matchInfo.awayTeam._id} onClick={handleSwitchTeam}>
                {matchInfo.awayTeam.name}
              </button>
            </StyledButtons>
            <View id={id} selectedTeam={selectedTeam} />
          </>
        ) : (
          <Edit matchInfo={matchInfo} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} setMode={setMode} />
        )}
      </div>
    </div>
  );
};

export default Match;
