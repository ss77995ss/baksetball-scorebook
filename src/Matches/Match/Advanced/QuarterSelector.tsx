import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  register: UseFormRegisterReturn;
}

const QuarterSelector: React.FC<Props> = ({ register }: Props) => {
  const [overtimes, setOverTimes] = useState(['OT1']);

  const handleClick = () => setOverTimes((prev) => [...prev, `OT${prev.length + 1}`]);

  return (
    <div>
      <input
        {...register}
        key={`select-first-quarter`}
        type="radio"
        id={`#first-quarter-radio`}
        name="quarter"
        value="first"
      />
      <label htmlFor="#first-quarter-radio">第一節</label>
      <input
        {...register}
        key={`select-second-quarter`}
        type="radio"
        id={`#second-quarter-radio`}
        name="quarter"
        value="second"
      />
      <label htmlFor="#second-quarter-radio">第二節</label>
      <input
        {...register}
        key={`select-third-quarter`}
        type="radio"
        id={`#third-quarter-radio`}
        name="quarter"
        value="third"
      />
      <label htmlFor="#third-quarter-radio">第三節</label>
      <input
        {...register}
        key={`select-fourth-quarter`}
        type="radio"
        id={`#fourth-quarter-radio`}
        name="quarter"
        value="fourth"
      />
      <label htmlFor="#fourth-quarter-radio">第四節</label>
      {overtimes.map((overtime, index) => {
        return (
          <>
            <input
              {...register}
              key={`select-overtime-${index}`}
              type="radio"
              id={`#${index}-${overtime}-radio`}
              name="quarter"
              value="quarter"
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
