import { createContext, useContext, ReactNode, ReactComponentElement, useState } from 'react';

type PlayByPlaysStateType = {
  playByPlays: Array<Record<string, string>>;
};

type PlayByPlaysDispatchType = {
  setPlayByPlays: React.Dispatch<React.SetStateAction<Record<string, string>[]>>;
};

const PlayByPlaysState = createContext<PlayByPlaysStateType | undefined>(undefined);
const PlayByPlaysDispatch = createContext<PlayByPlaysDispatchType | undefined>(undefined);

function PlayByPlaysProvier({ children }: { children: ReactNode }): ReactComponentElement<React.FC> {
  const [playByPlays, setPlayByPlays] = useState<Array<Record<string, string>>>([]);

  return (
    <PlayByPlaysState.Provider value={{ playByPlays }}>
      <PlayByPlaysDispatch.Provider value={{ setPlayByPlays }}>{children}</PlayByPlaysDispatch.Provider>
    </PlayByPlaysState.Provider>
  );
}

function usePlayByPlaysState(): PlayByPlaysStateType {
  const context = useContext(PlayByPlaysState);

  if (context === undefined) {
    throw new Error('usePlayByPlaysState must be used within a PlayByPlaysProvier');
  }
  return context;
}

function usePlayByPlaysDispatch(): PlayByPlaysDispatchType {
  const context = useContext(PlayByPlaysDispatch);

  if (context === undefined) {
    throw new Error('usePlayByPlaysDispatch must be used within a PlayByPlaysProvier');
  }
  return context;
}

export { PlayByPlaysProvier, usePlayByPlaysState, usePlayByPlaysDispatch };
