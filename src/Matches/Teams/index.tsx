import styled from 'styled-components';
import { useTeams } from '../hooks/useAPI';
import NewTeam from './NewTeam';
import Team from './Team';

const StyledSection = styled.section`
  text-align: center;

  button {
    margin: 4px;
  }
`;

const Teams: React.FC = () => {
  const { isLoading, error, teams } = useTeams();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!teams || teams.length < 0) return <div>尚未有隊伍</div>;

  return (
    <StyledSection>
      <NewTeam />
      {teams.map((team) => (
        <Team key={team._id} team={team} />
      ))}
    </StyledSection>
  );
};

export default Teams;
