import { useLocalStorage } from 'react-use';
import { useForm } from 'react-hook-form';
import { remove, update } from 'ramda';
import styled from 'styled-components';
import { defaultPlayers, defaultPlayersList } from '../TurnoverSheet/constants';

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

type PlayersList = {
  name: string;
  value: string[];
};

const PlayerList: React.FC = () => {
  const [playersList, setPlayersList] = useLocalStorage<PlayersList[]>('playersList', defaultPlayersList);
  const [playerListSelectedIndex, setListIndex] = useLocalStorage<string>('playerListSelectedIndex', '0');
  const [playerListId, setPlayerListId] = useLocalStorage<number>('playerListId', 1);
  const { register, handleSubmit } = useForm();
  const listIndex = playerListSelectedIndex ? parseInt(playerListSelectedIndex, 10) : 0;
  const currentPlayers = playersList ? playersList[listIndex].value : defaultPlayers;
  const currentPlayerListName = playersList ? playersList[listIndex].name : '';

  const onSubmit = (data: Record<string, string>): void => {
    if (!playersList) return;

    const newValue = {
      name: playersList[listIndex].name,
      value: Object.values(data).map((newName, index) => {
        return newName ? newName : currentPlayers[index];
      }),
    };

    const newList = update(listIndex, newValue, playersList);

    setPlayersList(newList);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedIndex = event.target.value;

    setListIndex(selectedIndex);
  };

  const handleAdd = (): void => {
    if (!playersList || !playerListId) return;
    setPlayersList([...playersList, { name: `隊伍-${playerListId}`, value: defaultPlayers }]);
    setPlayerListId(playerListId + 1);
  };

  const handleDelete = (): void => {
    if (!playersList || playersList.length === 1) return alert('需要留至少一個名單');

    setPlayersList(remove(listIndex, 1, playersList));
  };

  const handleEditName = (): void => {
    if (!playersList) return;

    const newName = prompt('輸入此名單名稱：', currentPlayerListName) || currentPlayerListName;

    const newValue = {
      name: newName,
      value: currentPlayers,
    };

    const newList = update(listIndex, newValue, playersList);

    setPlayersList(newList);
  };

  return (
    <StyledSection>
      {playersList && (
        <select onChange={handleSelect} defaultValue={listIndex}>
          {playersList.map((players, index) => {
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
              <input name={`${index}`} defaultValue={player} ref={register} />
            </li>
          ))}
        </ul>
        <input type="submit" value="送出" />
      </form>
    </StyledSection>
  );
};

export default PlayerList;
