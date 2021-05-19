import { UseFormRegister } from 'react-hook-form';
import { keys } from 'ramda';
import { PlayerResultsType } from '../../types';
import { defaultStats, boxScoreHeaderName } from '../../constants';

interface Props {
  register: UseFormRegister<PlayerResultsType>;
}

const StatsForm: React.FC<Props> = ({ register }: Props) => {
  return (
    <>
      {keys(defaultStats).map((key) => (
        <div key={`stats-form-${key}`}>
          <label htmlFor={key}>{`${boxScoreHeaderName[key]}：`}</label>
          <input type="number" {...register(key)} />
        </div>
      ))}
      <div key="stats-form-minute">
        <label htmlFor="minutes">{`${boxScoreHeaderName['minutes']}：`}</label>
        <input {...register('minutes', { pattern: /^\d+(\.\d{1,2})?$/ })} />
      </div>
    </>
  );
};

export default StatsForm;
