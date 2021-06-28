import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMatchInfo } from '../hooks/useAPI';
import View from './View';
import Edit from './Edit';

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
      {mode === 'view' ? (
        <View
          id={id}
          selectedTeam={selectedTeam}
          matchInfo={matchInfo}
          handleSwitchTeam={handleSwitchTeam}
          setMode={setMode}
        />
      ) : (
        <Edit matchInfo={matchInfo} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} setMode={setMode} />
      )}
    </div>
  );
};

export default Match;
