import { useMutation, useQueryClient } from 'react-query';
import { PlayByPlayType } from '../../types';
import { API_DOMAIN, statsNames } from '../../constants';

const DeleteButton: React.FC<{ play: PlayByPlayType }> = ({ play }: { play: PlayByPlayType }) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, mutate } = useMutation(
    (formData: { playId: string }) =>
      fetch(`${API_DOMAIN}/playByPlays`, {
        method: 'DELETE',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('playByPlays'),
    },
  );

  const onDelete = (): void => {
    if (window.confirm(`刪除Play：${statsNames[play.statType]}？`)) {
      mutate({
        playId: play._id,
      });
    }
  };

  return (
    <>
      <button onClick={onDelete} disabled={isLoading}>
        刪除
      </button>
      {isError && <div>Something went wrong</div>}
    </>
  );
};

export default DeleteButton;
