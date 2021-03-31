import { useState, useContext, createContext, ReactNode, ReactComponentElement } from 'react';
import { useLocalStorage } from 'react-use';
import { PlayerListType } from '../types';
import { defaultPlayers, defaultPlayersList } from '../../TurnoverSheet/constants';

type State = {
  playerList: PlayerListType[];
  currentPlayers: string[];
  currentPlayerListName: string;
  listIndex: number;
  playerListId: number | undefined;
  onCourt: string[];
  setPlayerList: React.Dispatch<React.SetStateAction<PlayerListType[] | undefined>>;
  setListIndex: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPlayerListId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setOnCourt: React.Dispatch<React.SetStateAction<string[]>>;
};
type Children = { children: ReactNode };

const PlayersListCtx = createContext<State | undefined>(undefined);

function PlayerListProvider({ children }: Children): ReactComponentElement<React.FC> {
  const [playerList, setPlayerList] = useLocalStorage<PlayerListType[]>('playersList', defaultPlayersList);
  const [playerListSelectedIndex, setListIndex] = useLocalStorage<string>('playerListSelectedIndex', '0');
  const [playerListId, setPlayerListId] = useLocalStorage<number>('playerListId', 1);
  const listIndex = playerListSelectedIndex ? parseInt(playerListSelectedIndex, 10) : 0;
  const currentPlayers = playerList ? playerList[listIndex].value : defaultPlayers;
  const currentPlayerListName = playerList ? playerList[listIndex].name : '';
  const [onCourt, setOnCourt] = useState(currentPlayers.slice(0, 5));

  const state: State = {
    playerList: playerList || defaultPlayersList,
    currentPlayers,
    currentPlayerListName,
    listIndex,
    playerListId,
    onCourt,
    setPlayerList,
    setListIndex,
    setPlayerListId,
    setOnCourt,
  };

  return <PlayersListCtx.Provider value={state}>{children}</PlayersListCtx.Provider>;
}

function usePlayerListCtx(): State {
  const context = useContext(PlayersListCtx);

  if (context === undefined) {
    throw new Error('usePlayerListCtx must be used within a PlayerListProvider');
  }
  return context;
}

export { PlayerListProvider, usePlayerListCtx };
