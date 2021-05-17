import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { PlayerType } from '../types';
import { API_DOMAIN } from '../constants';
import Delete from './DeleteButton';

const Player: React.FC<{ player: PlayerType }> = ({ player }: { player: PlayerType }) => {
  const { isLoading, isError, mutate } = useMutation((formData: { playerId: string; name: string; number: string }) =>
    fetch(`${API_DOMAIN}/players`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
  const { register, handleSubmit } = useForm({ defaultValues: { name: player.name, number: player.number } });

  const onSubmit = (newPlayerInfo: { name: string; number: string }): void => {
    if (window.confirm(`修改球員資料為： 名字：${newPlayerInfo.name} 背號：${newPlayerInfo.number}`)) {
      mutate({
        playerId: player._id,
        name: newPlayerInfo.name,
        number: newPlayerInfo.number,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">名字：</label>
      <input {...register('name', { required: true })} disabled={isLoading} />
      <label htmlFor="number">背號：</label>
      <input {...register('number')} disabled={isLoading} />
      <button type="submit" disabled={isLoading}>
        修改
      </button>
      <Delete player={player} />
      {isError && <div>Something went wrong</div>}
    </form>
  );
};

export default Player;
