import { useMutation, useQueryClient } from 'react-query';
import { API_DOMAIN } from '../../constants';

interface Props {
  matchId: string;
}

const BackEditBtn: React.FC<Props> = ({ matchId }: Props) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, mutate } = useMutation(
    (formData: { matchId: string; mode: string }) =>
      fetch(`${API_DOMAIN}/matches/mode`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('matches'),
    },
  );

  const onClick = (): void => {
    if (window.confirm('返回編輯？')) {
      mutate({
        matchId,
        mode: 'advanced',
      });
    }
  };

  return (
    <>
      <button onClick={onClick} disabled={isLoading}>
        返回編輯
      </button>
      {isError && <div>Something went wrong</div>}
    </>
  );
};

export default BackEditBtn;
