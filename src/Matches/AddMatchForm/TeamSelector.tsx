import { UseFormRegisterReturn } from 'react-hook-form';
import { useTeams } from '../hooks/useAPI';

interface Props {
  defaultValue?: string;
  register: UseFormRegisterReturn;
  children: JSX.Element;
}

const TeamSelector: React.FC<Props> = ({ defaultValue = '', register, children }: Props) => {
  const { isLoading, error, teams } = useTeams();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!teams) return null;
  return (
    <div>
      {children}
      <select {...register}>
        {teams.map((team) => (
          <option key={team._id} value={team._id} selected={team.name === defaultValue}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
};

TeamSelector.defaultProps = {
  defaultValue: '',
};

export default TeamSelector;
