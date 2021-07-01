import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { statsCategories } from '../../../constants';
import SubStatsSelector from './SubStatsSelector';

interface Props {
  mainRegister: UseFormRegisterReturn;
  subRegister: UseFormRegisterReturn;
}

const StatsSelector: React.FC<Props> = ({ mainRegister, subRegister }: Props) => {
  const [selectedMainStats, setSelectedMainStats] = useState('shot');

  const handleSelectMainStats = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedMainStats(event.target.value);

  return (
    <div>
      <div>{`Selected Stat: ${selectedMainStats}`}</div>
      {Object.keys(statsCategories).map((stat, index) => {
        return (
          <>
            <input
              {...mainRegister}
              key={`select-stat-${stat}-${index}`}
              type="radio"
              id={`#stat-${stat}-radio`}
              value={stat}
              checked={selectedMainStats === stat}
              onChange={handleSelectMainStats}
            />
            <label htmlFor={`#stat-${stat}-radio`}>{statsCategories[stat].name}</label>
          </>
        );
      })}
      <SubStatsSelector mainStat={selectedMainStats} subRegister={subRegister} />
    </div>
  );
};

export default StatsSelector;
