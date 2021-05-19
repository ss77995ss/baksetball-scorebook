import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { TeamType } from '../types';
import { API_DOMAIN } from '../constants';
import DeleteButton from './DeleteButton';
import styled from 'styled-components';

const StyledFlex = styled.section`
  display: flex;
  justify-content: center;
`;

const Team: React.FC<{ team: TeamType }> = ({ team }: { team: TeamType }) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, mutate } = useMutation(
    (formData: { teamId: string; name: string }) =>
      fetch(`${API_DOMAIN}/teams`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(['teams', { id: variables.teamId }], data);
      },
    },
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
    <StyledFlex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name', { required: true })} disabled={isLoading} />
        <button type="submit" disabled={isLoading}>
          修改
        </button>
        {isError && <div>Something went wrong</div>}
      </form>
      <DeleteButton team={team} />
    </StyledFlex>
  );
};

export default Team;
