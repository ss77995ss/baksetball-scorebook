import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const NewTeam: React.FC = () => {
  const { isLoading, isError, mutate } = useMutation((formData: { name: string }) =>
    fetch('http://localhost:8080/teams', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
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
