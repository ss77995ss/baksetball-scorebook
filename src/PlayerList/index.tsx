import { useForm } from 'react-hook-form';
import { remove, update } from 'ramda';
import styled from 'styled-components';
import { usePlayerListCtx } from './hooks/usePlayerList';
import { defaultPlayers } from '../TurnoverSheet/constants';

const StyledSection = styled.section`
  text-align: center;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  input {
    margin-bottom: 4px;
  }

  button {
    margin: 0.5rem;
  }
`;

const PlayerList: React.FC = () => {
  const {
    playerList,
    currentPlayers,
    currentPlayerListName,
    listIndex,
    playerListId,
    setPlayerList,
    setListIndex,
    setPlayerListId,
  } = usePlayerListCtx();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: Record<string, string>): void => {
    const newValue = {
      name: currentPlayerListName,
      value: Object.values(data).map((newName, index) => {
        return newName ? newName : currentPlayers[index];
      }),
    };

    const newList = update(listIndex, newValue, playerList);

    setPlayerList(newList);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedIndex = event.target.value;

    setListIndex(selectedIndex);
  };

  const handleAdd = (): void => {
    if (!playerList || !playerListId) return;
    setPlayerList([...playerList, { name: `隊伍-${playerListId}`, value: defaultPlayers }]);
    setPlayerListId(playerListId + 1);
  };

  const handleDelete = (): void => {
    if (!playerList || playerList.length === 1) return alert('需要留至少一個名單');

    setPlayerList(remove(listIndex, 1, playerList));
  };

  const handleEditName = (): void => {
    if (!playerList) return;

    const newName = prompt('輸入此名單名稱：', currentPlayerListName) || currentPlayerListName;

    const newValue = {
      name: newName,
      value: currentPlayers,
    };

    const newList = update(listIndex, newValue, playerList);

    setPlayerList(newList);
  };

  return (
    <StyledSection>
      {playerList && (
        <select onChange={handleSelect} defaultValue={listIndex}>
          {playerList.map((players, index) => {
            return (
              <option key={`players-list-${index}`} value={index}>
                {players.name}
              </option>
            );
          })}
        </select>
      )}
      <br />
      <button onClick={handleAdd}>新增球員名單</button>
      <button onClick={handleDelete}>刪除當下球員名單</button>
      <button onClick={handleEditName}>編輯球員名單名稱</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {currentPlayers.map((player, index) => (
            <li key={`${player}-${index}`}>
              <input {...register(`${index}`)} defaultValue={player} />
            </li>
          ))}
        </ul>
        <input type="submit" value="送出" />
      </form>
    </StyledSection>
  );
};

export default PlayerList;
