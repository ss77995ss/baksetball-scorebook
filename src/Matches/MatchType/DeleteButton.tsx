import { useMutation } from 'react-query';
import { MatchCategoryType } from '../types';
import { API_DOMAIN } from '../constants';

const DeleteButton: React.FC<{ matchType: MatchCategoryType }> = ({ matchType }: { matchType: MatchCategoryType }) => {
  const { isLoading, isError, mutate } = useMutation((formData: { typeId: string }) =>
    fetch(`${API_DOMAIN}/matchTypes`, {
      method: 'DELETE',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );

  const onDelete = (): void => {
    if (window.confirm(`刪除類型：${matchType.name}？`)) {
      mutate({
        typeId: matchType._id,
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
