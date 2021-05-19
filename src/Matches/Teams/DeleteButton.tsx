import { useMutation, useQueryClient } from 'react-query';
import { TeamType } from '../types';
import { API_DOMAIN } from '../constants';

const DeleteButton: React.FC<{ team: TeamType }> = ({ team }: { team: TeamType }) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, mutate } = useMutation(
    (formData: { teamId: string }) =>
      fetch(`${API_DOMAIN}/teams`, {
        method: 'DELETE',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('teams'),
    },
  );

  const onDelete = (): void => {
    if (window.confirm(`刪除球隊：${team.name}？`)) {
      mutate({
        teamId: team._id,
      });
    }
  };

  return (
    <>
      <button type="submit" onClick={onDelete} disabled={isLoading}>
        刪除
      </button>
      {isError && <div>Something went wrong</div>}
    </>
  );
};

export default DeleteButton;
