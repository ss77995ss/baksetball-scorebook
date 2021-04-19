import { useState } from 'react';
import { useTeams } from '../hooks/useAPI';
import PlayerList from './PlayerList';

const Players: React.FC = () => {
  const { isLoading, error, teams } = useTeams();
  const [selectedTeam, setSelectedTeam] = useState(teams ? teams[0]._id : '');

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!teams) return null;

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <div>
      <div>{`選擇的隊伍： ${selectedTeam}`}</div>
      <select onChange={handleTeamChange}>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>
      <div>
        球員名單：
        <PlayerList teamId={selectedTeam} />
      </div>
    </div>
  );
};

export default Players;
