import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import AdvancedStats from './AdvancedStats';
import TurnoverSheet from './TurnoverSheet';

const StyledNav = styled.nav`
  text-align: center;
  padding-top: 1rem;

  a {
    margin: 4px;
  }
`;

const App: React.FC = () => {
  return (
    <Router>
      <main>
        <header>
          <StyledNav>
            <Link to="/">進階數據紀錄表</Link>
            <Link to="/turnover">失誤記錄表</Link>
          </StyledNav>
        </header>
        <Switch>
          <Route exact path="/">
            <AdvancedStats />
          </Route>
          <Route path="/turnover">
            <TurnoverSheet />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
