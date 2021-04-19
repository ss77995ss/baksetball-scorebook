import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { TeamType } from '../types';
import Delete from './Delete';

const Team: React.FC<{ team: TeamType }> = ({ team }: { team: TeamType }) => {
  const { isLoading, isError, mutate } = useMutation((formData: { teamId: string; name: string }) =>
    fetch('http://localhost:8080/teams', {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
  const { register, handleSubmit } = useForm({ defaultValues: { name: team.name } });

  const onSubmit = (newName: { name: string }): void => {
    if (window.confirm(`修改隊名為： ${newName.name}？`)) {
      mutate({
        teamId: team._id,
        name: newName.name,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input ref={register} name="name" disabled={isLoading} />
      <button type="submit" disabled={isLoading}>
        修改
      </button>
      <Delete team={team} />
      {isError && <div>Something went wrong</div>}
    </form>
  );
};

export default Team;
