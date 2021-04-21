import { useMutation } from 'react-query';
import { TeamType } from '../types';

const DeleteButton: React.FC<{ team: TeamType }> = ({ team }: { team: TeamType }) => {
  const { isLoading, isError, mutate } = useMutation((formData: { teamId: string }) =>
    fetch('http://localhost:8080/teams', {
      method: 'DELETE',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
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
