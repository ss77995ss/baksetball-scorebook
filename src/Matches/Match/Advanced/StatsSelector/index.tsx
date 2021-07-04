import { useState } from 'react';
import { UseFormRegisterReturn, UseFormSetValue, FieldValues } from 'react-hook-form';
import { statsCategories } from '../../../constants';
import SubStatsSelector from './SubStatsSelector';

interface Props {
  mainRegister: UseFormRegisterReturn;
  subRegister: UseFormRegisterReturn;
  setValue: UseFormSetValue<FieldValues>;
}

const StatsSelector: React.FC<Props> = ({ mainRegister, subRegister, setValue }: Props) => {
  const [selectedMainStats, setSelectedMainStats] = useState('shot');
  const isNotOnlyMain = !(selectedMainStats === 'assists' || selectedMainStats === 'turnovers');

  const handleSelectMainStats = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNotOnlyMain) {
      setValue('subStat', null);
    }
    setSelectedMainStats(event.target.value);
  };

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
      {isNotOnlyMain && <SubStatsSelector mainStat={selectedMainStats} subRegister={subRegister} />}
    </div>
  );
};

export default StatsSelector;
