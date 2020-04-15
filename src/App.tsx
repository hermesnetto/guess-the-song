import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import Brand from './components/Brand';
import GameScreen from './screens/Game';
import SetupScreen from './screens/Setup';
import HomeScreen from './screens/Home';
import useSpotifyToken from './custom-hooks/useSpotifyToken';
import { switchGameStateAction } from './store/global';
import { StoreContext } from './store';
import { GameStates } from './store/global';
import Footer from './components/Footer';

const isSetupPage = (gameState: GameStates): boolean => gameState === 'SETTING_UP';
const isGamePage = (gameState: GameStates): boolean => gameState === 'PLAYING';
const isHomePage = (gameState: GameStates): boolean => gameState === 'INIT';

const App: React.FC = () => {
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

  const renderBody = () => {
    if (isGamePage(state.gameState)) return <GameScreen />;
    if (isSetupPage(state.gameState)) return <SetupScreen />;
    return <HomeScreen />;
  };

  return (
    <>
      <Page>
        <Container>
          {isHomePage(state.gameState) && <Brand />}
          {renderBody()}
          <Footer />
        </Container>
      </Page>
    </>
  );
};

const Page = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 30px 30px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export default App;
