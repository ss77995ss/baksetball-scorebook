import { Fragment } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { statsCategories } from '../../../constants';

interface Props {
  mainStat: string;
  subRegister: UseFormRegisterReturn;
}

const SubStatsSelector: React.FC<Props> = ({ mainStat, subRegister }: Props) => {
  return (
    <div>
      {Object.keys(statsCategories[mainStat].subStats).map((stat, index) => {
        return (
          <Fragment key={`${mainStat}-${stat}`}>
            <input {...subRegister} id={`${mainStat}-${stat}`} type="radio" value={stat} defaultChecked={index === 0} />
            <label htmlFor={`${mainStat}-${stat}`}>{statsCategories[mainStat].subStats[stat]}</label>
          </Fragment>
        );
      })}
    </div>
  );
};

export default SubStatsSelector;
