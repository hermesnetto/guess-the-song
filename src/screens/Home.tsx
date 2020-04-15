import React, { useEffect, useContext } from 'react';

import Button from '../components/Button';
import useSpotifyToken from '../custom-hooks/useSpotifyToken';
import useSpotifySignIn from '../custom-hooks/useSpotifySignIn';
import { switchGameStateAction } from '../store/global';
import { StoreContext } from '../store';

const HomeScreen: React.FC = () => {
  const signIn = useSpotifySignIn();
  const { dispatch } = useContext(StoreContext);

  const {
    token,
    actions: { readToken, saveToken },
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
    }
  }, [dispatch, saveToken]);

  const spotifySignIn = () => {
    if (!token && !readToken()) {
      signIn();
    } else {
      dispatch(switchGameStateAction('SETTING_UP'));
    }
  };

  return (
    <>
      <Button size="lg" onClick={spotifySignIn} block>
        Start Game
      </Button>
    </>
  );
};

export default HomeScreen;
