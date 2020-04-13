import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import theme from './theme';
import HomeScreen from './screens/Home';
import SetupGameScreen from './screens/Setup';
import GameScreen from './screens/Game';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Page>
          <Container>
            <Switch>
              <Route path="/setup-game" component={SetupGameScreen} />
              <Route path="/game" component={GameScreen} />
              <Route path="/" component={HomeScreen} />
            </Switch>
          </Container>
        </Page>
      </Router>
    </ThemeProvider>
  );
};

const Page = styled.div`
  background: ${props => props.theme.colors.background};
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
`;

export default App;
