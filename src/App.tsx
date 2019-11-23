import React, { useReducer } from 'react';
import './App.css';
import { BOX_TITLES } from './constants/base';
import BoxContext from './context/box';
import { boxReducer } from './reducer/box';
import BoxContent from './boxContent';

const renderTitles = Object.values(BOX_TITLES).map((title: string) => <th>{title}</th>);
const initialBox = {
  1: {
    number: 0,
    twoPointMade: 0,
    twoPointAttempt: 0,
    threePointMade: 0,
    threePointAttempt: 0,
    freeThrowMade: 0,
    freeThrowAttempt: 0,
    offensiveRebound: 0,
    defensiveRebound: 0,
    totalRebound: 0,
    assist: 0,
    steal: 0,
    block: 0,
    tunrover: 0,
    foul: 0,
    points: 0,
  },
};

const App: React.FC = () => {
  const [boxState, boxDispatch] = useReducer(boxReducer, initialBox);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Basketball Scorebook</h1>
      </header>
      <BoxContext.Provider value={{ box: boxState, boxDispatch }}>
        <div>
          <table data-align="center">
            <thead>
              <tr>{renderTitles}</tr>
            </thead>
            <BoxContent />
          </table>
        </div>
        <div>
          <button onClick={() => boxDispatch({ type: 'ADD_NUMBER' })}>ADD PLAYERS</button>
        </div>
      </BoxContext.Provider>
    </div>
  );
};

export default App;
