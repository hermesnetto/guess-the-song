import React, { useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';

import Brand from './components/Brand';
import GameScreen from './screens/Game';
import SetupScreen from './screens/Setup';
import HomeScreen from './screens/Home';
import useSpotifyToken from './custom-hooks/useSpotifyToken';
import { switchGameStateAction } from './store/global';
import { StoreContext } from './store';
import { GameStates } from './store/global';

function isSetupPage(gameState: GameStates): boolean {
  return gameState === 'SETTING_UP';
}

function isGamePage(gameState: GameStates): boolean {
  return gameState === 'PLAYING';
}

function isHomePage(gameState: GameStates): boolean {
  return gameState === 'INIT';
}

const App: React.FC = ({ children }) => {
  const { dispatch } = useContext(StoreContext);

  const {
    actions: { saveToken },
  } = useSpotifyToken();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      saveToken(
        hash
          .replace('#', '')
          .split('&')[0]
          .split('=')[1]
      );

      dispatch(switchGameStateAction('SETTING_UP'));
      window.history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      );
    }
  }, [dispatch, saveToken]);

  const { state } = useContext(StoreContext);

  function renderBody() {
    if (isGamePage(state.gameState)) return <GameScreen />;
    if (isSetupPage(state.gameState)) return <SetupScreen />;
    return <HomeScreen />;
  }

  const isHome = isHomePage(state.gameState);

  return (
    <>
      <Page>
        <Container spaceTop={!isHome}>
          {isHome && <Brand />}
          {renderBody()}
        </Container>
      </Page>
    </>
  );
};

const Page = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div<{ spaceTop: boolean }>`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  flex-direction: column;

  ${props =>
    props.spaceTop &&
    css`
      margin-top: 20px;
    `}
`;

export default App;
