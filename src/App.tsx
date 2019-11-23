import React from 'react';
import './App.css';
import { tableTitiles } from './constant';

const renderTitles = Object.values(tableTitiles).map((title: string) => <th>{title}</th>);

const renderRows = Array.from({ length: Object.values(tableTitiles).length }, (v, number) => <td></td>);

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Basketball Scorebook</h1>
      </header>
      <div>
        <table data-align="center">
          <thead>
            <tr>{renderTitles}</tr>
          </thead>
          <tbody>
            <tr>{renderRows}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
