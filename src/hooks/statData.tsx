import React, { createContext, ReactNode, useContext, useReducer, ReactComponentElement } from 'react';
import { Column } from 'react-table';
import { columns, initialData } from '../constants';

type UpdateParamsType = {
  team: string;
  rowIndex: number;
  columnId: string;
  value:
    | { count: number; points: number }
    | number
    | { name: string; title: string | { points: string; count: string } };
};

type Action =
  | { type: 'UPDATE_CELL'; params: UpdateParamsType }
  | { type: 'UPDATE_STATS_NAME'; params: UpdateParamsType };
type Dispatch = (action: Action) => void;
type State = { columns: Array<Column>; home: Array<object>; away: Array<object> };
type StatsProviderProps = { children: ReactNode };

const StatsStateContext = createContext<State | undefined>(undefined);
const StatsDispatchContext = createContext<Dispatch | undefined>(undefined);

function statsReducer(state: State, action: Action): State {
  const { team, rowIndex, columnId, value } = action.params;

  switch (action.type) {
    case 'UPDATE_CELL': {
      const prev = action.params.team === 'home' ? state.home : state.away;

      return {
        ...state,
        [team]: prev.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...prev[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        }),
      };
    }
    case 'UPDATE_STATS_NAME': {
      return {
        ...state,
        home: state.home.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...state.home[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        }),
        away: state.away.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...state.away[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        }),
      };
    }
    default: {
      throw new Error('Unknown action type');
    }
  }
}

function StatsProvider({ children }: StatsProviderProps): ReactComponentElement<React.FC> {
  const [state, dispatch] = useReducer(statsReducer, { columns: columns, home: initialData, away: initialData });
  return (
    <StatsStateContext.Provider value={state}>
      <StatsDispatchContext.Provider value={dispatch}>{children}</StatsDispatchContext.Provider>
    </StatsStateContext.Provider>
  );
}
function useStatsState(): State {
  const context = useContext(StatsStateContext);
  if (context === undefined) {
    throw new Error('useStatsState must be used within a StatsProvider');
  }
  return context;
}
function useStatsDispatch(): Dispatch {
  const context = useContext(StatsDispatchContext);
  if (context === undefined) {
    throw new Error('useStatsDispatch must be used within a StatsProvider');
  }
  return context;
}
export { StatsProvider, useStatsState, useStatsDispatch };
