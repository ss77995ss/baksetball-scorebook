import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { API_DOMAIN } from '../../constants';

interface Props {
  matchId: string;
}

const DeleteMatchButton: React.FC<Props> = ({ matchId }: Props) => {
  const history = useHistory();
  const { isLoading, isError, mutate } = useMutation(
    (formData: { matchId: string }) =>
      fetch(`${API_DOMAIN}/matches`, {
        method: 'DELETE',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => {
        history.push('/matches');
      },
    },
  );

  const onDelete = (): void => {
    if (window.confirm(`確定刪除比賽？`)) {
      mutate({
        matchId,
      });
    }
  };

  return (
    <>
      <button onClick={onDelete} disabled={isLoading}>
        刪除比賽
      </button>
      {isError && <div>Something went wrong</div>}
    </>
  );
};

export default DeleteMatchButton;
