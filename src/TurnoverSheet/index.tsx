import { useState } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'react-use';
import DisplayTable from './DisplayTable';
import EditMode from './EditMode';
import { initialSingleData, initialTurnoverData, defaultPlayers, defaultPlayersList } from './constants';
import { StatHistoryType } from './types';

const StyledButtonSection = styled.section`
  text-align: center;

  button {
    margin: 12px;
  }
`;

type PlayersList = {
  name: string;
  value: string[];
};

const TurnoverSheet: React.FC = () => {
  const [playersList] = useLocalStorage<PlayersList[]>('playersList', defaultPlayersList);
  const [listIndex] = useLocalStorage<number>('playerListSelectedIndex');
  const playerList = playersList && listIndex ? playersList[listIndex].value : defaultPlayers;
  const [mode, setMode] = useState('編輯');
  const [turnoverData, setTurnoverData] = useState(
    playerList
      ? playerList.map(playerName => {
          return {
            ...initialSingleData,
            playerName,
          };
        })
      : initialTurnoverData,
  );
  const [statHistory, setStatHistory] = useState<StatHistoryType[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>
    setMode(event.currentTarget.value);

  return (
    <section>
      <StyledButtonSection>
        <button type="button" value="編輯" onClick={handleClick}>
          編輯
        </button>
        <button type="button" value="檢視" onClick={handleClick}>
          檢視
        </button>
      </StyledButtonSection>
      {mode === '編輯' ? (
        <EditMode
          playerList={playerList}
          statHistory={statHistory}
          setTurnoverData={setTurnoverData}
          setStatHistory={setStatHistory}
        />
      ) : (
        <DisplayTable turnoverData={turnoverData} />
      )}
    </section>
  );
};

export default TurnoverSheet;
