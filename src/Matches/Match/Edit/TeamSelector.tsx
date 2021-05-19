import { UseFormRegister } from 'react-hook-form';
import { TeamType, PlayerResultsType } from '../../types';

interface Props {
  register: UseFormRegister<PlayerResultsType>;
  homeTeam: TeamType;
  awayTeam: TeamType;
  selectedTeam: string;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string>>;
}

const TeamSelector: React.FC<Props> = ({ register, homeTeam, awayTeam, selectedTeam, setSelectedTeam }: Props) => {
  const handleChangeTeam = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedTeam(event.target.value);

  return (
    <div>
      <select {...register('teamId')} value={selectedTeam} onChange={handleChangeTeam}>
        <option value={homeTeam._id}>{homeTeam.name}</option>
        <option value={awayTeam._id}>{awayTeam.name}</option>
      </select>
    </div>
  );
};

export default TeamSelector;
