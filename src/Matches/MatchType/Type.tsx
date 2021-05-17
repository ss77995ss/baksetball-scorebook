import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { MatchCategoryType } from '../types';
import { API_DOMAIN } from '../constants';
import DeleteButton from './DeleteButton';

const Type: React.FC<{ matchType: MatchCategoryType }> = ({ matchType }: { matchType: MatchCategoryType }) => {
  const { isLoading, isError, mutate } = useMutation((formData: MatchCategoryType) =>
    fetch(`${API_DOMAIN}/matchType`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
  const { register, handleSubmit } = useForm({ defaultValues: { name: matchType.name, type: matchType.type } });

  const onSubmit = (newType: MatchCategoryType): void => {
    if (window.confirm(`修改隊名為： ${newType.name}？`)) {
      mutate({
        _id: matchType._id,
        name: newType.name,
        type: newType.type,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} disabled={isLoading} />
      <select {...register('type', { required: true })} disabled={isLoading}>
        <option>友誼賽</option>
        <option>其他盃賽</option>
        <option>大專盃</option>
      </select>
      <button type="submit" disabled={isLoading}>
        修改
      </button>
      <DeleteButton matchType={matchType} />
      {isError && <div>Something went wrong</div>}
    </form>
  );
};

export default Type;
