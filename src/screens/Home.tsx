import React, { useEffect, useContext } from 'react';

import Button from '../components/Button';
import useSpotifyToken from '../custom-hooks/useSpotifyToken';
import { switchGameStateAction } from '../store/global';
import { StoreContext } from '../store';

const spotifyAuthEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'd9d505e880594b7ca174cf7feeb525ea';
const redirectUri = 'http://localhost:3000/';
const scopes = ['user-top-read'];

const HomeScreen: React.FC = () => {
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
      /**
       * @TODO Validate expired tokens
       */
      window.location.href = `${spotifyAuthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        '%20'
      )}&response_type=token&show_dialog=true`;
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
