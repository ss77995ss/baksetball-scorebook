import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { MatchCategoryType } from '../types';
import { API_DOMAIN } from '../constants';

interface Props {
  matchTypes: MatchCategoryType[];
}

const NewTeam: React.FC<Props> = ({ matchTypes }: Props) => {
  const { isLoading, isError, mutate } = useMutation((formData: { name: string; type: string }) =>
    fetch(`${API_DOMAIN}/matchTypes`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
  const { register, handleSubmit } = useForm<{ name: string; type: string }>();

  const onSubmit = (newType: { name: string; type: string }): void => {
    if (matchTypes.find((type) => type.name === newType.name)) {
      return alert('重複名稱');
    }
    if (window.confirm(`新增賽事類型： ${newType.name}?`)) {
      mutate({
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
        新增
      </button>
      {isError && <div>Something went wrong</div>}
    </form>
  );
};

export default NewTeam;
