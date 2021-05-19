import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { API_DOMAIN } from '../constants';

const NewTeam: React.FC = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, mutate } = useMutation(
    (formData: { name: string }) =>
      fetch(`${API_DOMAIN}/teams`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('teams'),
    },
  );
  const { register, handleSubmit } = useForm();

  const onSubmit = (newName: { name: string }): void => {
    if (window.confirm(`新增隊伍： ${newName.name}？`)) {
      mutate({
        name: newName.name,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} disabled={isLoading} />
      <button type="submit" disabled={isLoading}>
        新增
      </button>
      {isError && <div>Something went wrong</div>}
    </form>
  );
};

export default NewTeam;
