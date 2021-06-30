import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const QUARTERS = [
  { name: '第一節', value: 'first' },
  { name: '第二節', value: 'second' },
  { name: '第三節', value: 'third' },
  { name: '第四節', value: 'fourth' },
];

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
      {QUARTERS.map((quarter) => (
        <>
          <input
            {...register}
            key={`select-${quarter.value}-quarter`}
            type="radio"
            id={`#${quarter.value}-quarter-radio`}
            name="quarter"
            value={quarter.value}
            checked={checkedQuarter === quarter.value}
            onChange={handleCheckedQuarter}
          />
          <label key={`select-${quarter.value}-quarter-label`} htmlFor={`#${quarter.value}-quarter-radio`}>
            {quarter.name}
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
