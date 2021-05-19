import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { PlayerType } from '../types';
import { API_DOMAIN } from '../constants';
import Delete from './DeleteButton';
import styled from 'styled-components';

const StyledFlex = styled.section`
  display: flex;
  justify-content: center;
`;

const Player: React.FC<{ player: PlayerType }> = ({ player }: { player: PlayerType }) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, mutate } = useMutation(
    (formData: { playerId: string; name: string; number: string }) =>
      fetch(`${API_DOMAIN}/players`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(['players', { id: variables.playerId }], data);
      },
    },
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
    <StyledFlex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">名字：</label>
        <input {...register('name', { required: true })} disabled={isLoading} />
        <label htmlFor="number">背號：</label>
        <input {...register('number')} disabled={isLoading} />
        <button type="submit" disabled={isLoading}>
          修改
        </button>
        {isError && <div>Something went wrong</div>}
      </form>
      <Delete player={player} />
    </StyledFlex>
  );
};

export default Player;
