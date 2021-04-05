import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import { StatsProvider } from './AdvancedStats/hooks/statData';
import { PlayerListProvider } from './PlayerList/hooks/usePlayerList';
import AdvancedStats from './AdvancedStats';
import TurnoverSheet from './TurnoverSheet';
import PlayerList from './PlayerList';
import Matches from './Matches';

const queryClient = new QueryClient();

const StyledNav = styled.nav`
  text-align: center;
  padding-top: 12px;
  padding-bottom: 8px;

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
            <Link to="playerlist">球員名單</Link>
          </StyledNav>
        </header>
        <StatsProvider>
          <PlayerListProvider>
            <Switch>
              <Route exact path="/">
                <AdvancedStats />
              </Route>
              <Route path="/turnover">
                <TurnoverSheet />
              </Route>
              <Route path="/playerlist">
                <PlayerList />
              </Route>
              <Route path="/matches">
                <QueryClientProvider client={queryClient}>
                  <Matches />
                </QueryClientProvider>
              </Route>
            </Switch>
          </PlayerListProvider>
        </StatsProvider>
      </main>
    </Router>
  );
};

export default App;
