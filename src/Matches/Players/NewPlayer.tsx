import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { API_DOMAIN } from '../constants';

const NewTeam: React.FC<{ teamId: string }> = ({ teamId }: { teamId: string }) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, mutate } = useMutation(
    (formData: { teamId: string; name: string; number: string }) =>
      fetch(`${API_DOMAIN}/players`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('players'),
    },
  );
  const { register, handleSubmit } = useForm<{ name: string; number: string }>();

  const onSubmit = (newPlayerInfo: { name: string; number: string }): void => {
    if (window.confirm(`新增球員 名字：${newPlayerInfo.name} 背號：${newPlayerInfo.number}?`)) {
      mutate({
        teamId,
        name: newPlayerInfo.name,
        number: newPlayerInfo.number || '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">名字：</label>
      <input {...register('name', { required: true })} disabled={isLoading} />
      <label htmlFor="number">背號：</label>
      <input {...register('number')} disabled={isLoading} />
      <button type="submit" disabled={isLoading}>
        新增
      </button>
      {isError && <div>Something went wrong</div>}
    </form>
  );
};

export default NewTeam;
