import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MatchInfoType } from '../../types';
import MatchInfo from '../View/MatchInfo';
import TeamButtons from '../View/TeamButtons';
import QuarterSelector from './QuarterSelector';
import OnCourt from './OnCourt';
import StatsSelector from './StatsSelector';

interface Props {
  matchInfo: MatchInfoType;
}

const Advanced: React.FC<Props> = ({ matchInfo }: Props) => {
  const [selectedTeam, setSelectedTeam] = useState(matchInfo.homeTeam._id);
  const { register, handleSubmit } = useForm();

  const handleSwitchTeam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelectedTeam(event.currentTarget.value);
  };

  const onSubmit = (newPlay: Record<string, string>) => {
    console.log(newPlay);
  };

  return (
    <div>
      <MatchInfo matchInfo={matchInfo} />
      <TeamButtons matchInfo={matchInfo} handleSwitchTeam={handleSwitchTeam} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <QuarterSelector register={register('quarter')} />
        <OnCourt teamId={selectedTeam} register={register('playerId')} />
        <StatsSelector mainRegister={register('mainStat')} subRegister={register('subStat')} />
        <button type="submit">送出</button>
      </form>
    </div>
  );
};

export default Advanced;
