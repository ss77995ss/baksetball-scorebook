import { useState } from 'react';
import styled from 'styled-components';
import { useTeams } from '../hooks/useAPI';
import PlayerList from './PlayerList';
import GoBackBtn from '../common/GoBackBtn';

const StyledSection = styled.section`
  text-align: center;

  button {
    margin: 4px;
  }

  input {
    margin-right: 4px;
  }
`;

const Players: React.FC = () => {
  const { isLoading, error, teams } = useTeams();
  const [selectedTeam, setSelectedTeam] = useState('');

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!teams) return null;

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <StyledSection>
      <div>
        <GoBackBtn />
      </div>
      <select onChange={handleTeamChange}>
        <option></option>
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
    </StyledSection>
  );
};

export default Players;
