import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { quarterNames } from '../../constants';

interface Props {
  register: UseFormRegisterReturn;
}

const QuarterSelector: React.FC<Props> = ({ register }: Props) => {
  const [overtimes, setOverTimes] = useState(['OT1']);
  const [checkedQuarter, setCheckedQuarter] = useState('first');

  const handleClick = () => setOverTimes((prev) => [...prev, `OT${prev.length + 1}`]);

  const handleCheckedQuarter = (event: React.ChangeEvent<HTMLInputElement>) => setCheckedQuarter(event.target.value);

  return (
    <div>
      {Object.keys(quarterNames).map((key) => (
        <>
          <input
            {...register}
            key={`select-${quarterNames[key]}-quarter`}
            type="radio"
            id={`#${quarterNames[key]}-quarter-radio`}
            name="quarter"
            value={quarterNames[key]}
            checked={checkedQuarter === quarterNames[key]}
            onChange={handleCheckedQuarter}
          />
          <label key={`select-${quarterNames[key]}-quarter-label`} htmlFor={`#${quarterNames[key]}-quarter-radio`}>
            {key}
          </label>
        </>
      ))}
      {overtimes.map((overtime, index) => {
        return (
          <>
            <input
              {...register}
              key={`select-overtime-${index}`}
              type="radio"
              id={`#${index}-${overtime}-radio`}
              name="quarter"
              value={overtime}
              checked={checkedQuarter === overtime}
              onChange={handleCheckedQuarter}
            />
            <label htmlFor={`#${index}-${overtime}-radio`}>{overtime}</label>
          </>
        );
      })}
      <button onClick={handleClick}>新增OT</button>
    </div>
  );
};

export default QuarterSelector;
