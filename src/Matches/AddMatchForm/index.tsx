import { Link } from 'react-router-dom';
import { useTeams } from '../hooks/useAPI';

const AddMatchForm: React.FC = () => {
  const { isLoading, error, teams } = useTeams();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!teams) return null;

  return (
    <div>
      <Link to="/match/teams">編輯隊伍</Link>
      <Link to="/match/players">編輯球員名單</Link>
      <select>
        {teams.map((team) => (
          <option key={team._id}>{team.name}</option>
        ))}
      </select>
    </div>
  );
};

export default AddMatchForm;
