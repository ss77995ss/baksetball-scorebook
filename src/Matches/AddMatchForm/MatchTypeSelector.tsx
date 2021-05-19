import { UseFormRegisterReturn } from 'react-hook-form';
import { useMatchTypes } from '../hooks/useAPI';
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegisterReturn;
}

const MatchTypeSelector: React.FC<Props> = ({ register }: Props) => {
  const { isLoading, error, matchTypes } = useMatchTypes();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!matchTypes || matchTypes.length < 0) return <div>尚未有資料</div>;

  return (
    <div>
      <label htmlFor="typeId">賽事類型：</label>
      <select {...register}>
        {matchTypes.map((type) => (
          <option key={`new-match-type-option-${type._id}`} value={type._id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MatchTypeSelector;
