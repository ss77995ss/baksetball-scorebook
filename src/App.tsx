import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import { StatsProvider } from './AdvancedStats/hooks/statData';
import { PlayerListProvider } from './PlayerList/hooks/usePlayerList';
import AdvancedStats from './AdvancedStats';
import TurnoverSheet from './TurnoverSheet';
import PlayerList from './PlayerList';
import Matches from './Matches';
import MatchType from './Matches/MatchType';
import Match from './Matches/Match';
import AddMatchForm from './Matches/AddMatchForm';
import Teams from './Matches/Teams';
import Players from './Matches/Players';
import SinglePlayerBox from './Matches/Match/View/SinglePlayerBox';

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
            <Link to="/playerlist">球員名單</Link>
            <Link to="/matches">賽事資料</Link>
          </StyledNav>
        </header>
        <StatsProvider>
          <PlayerListProvider>
            <QueryClientProvider client={queryClient}>
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
                  <Matches />
                </Route>
                <Route path="/matchType">
                  <MatchType />
                </Route>
                <Route path="/match/show/:id">
                  <Match />
                </Route>
                <Route path="/match/add">
                  <AddMatchForm />
                </Route>
                <Route path="/match/teams">
                  <Teams />
                </Route>
                <Route path="/match/players">
                  <Players />
                </Route>
                <Route path="/match/player/:id">
                  <SinglePlayerBox />
                </Route>
              </Switch>
            </QueryClientProvider>
          </PlayerListProvider>
        </StatsProvider>
      </main>
    </Router>
  );
};

export default App;
