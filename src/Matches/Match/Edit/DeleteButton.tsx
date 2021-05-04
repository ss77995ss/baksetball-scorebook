import { useMutation } from 'react-query';

interface Props {
  id: string;
  name: string;
  setMode: React.Dispatch<React.SetStateAction<'view' | 'edit'>>;
}

const DeleteButton: React.FC<Props> = ({ id, name, setMode }: Props) => {
  const { isLoading, isError, mutate } = useMutation(
    (formData: { resultId: string }) =>
      fetch('http://localhost:8080/playerResults', {
        method: 'DELETE',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => {
        setMode('view');
      },
    },
  );

  const onDelete = (): void => {
    if (window.confirm(`刪除：${name}？`)) {
      mutate({
        resultId: id,
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
