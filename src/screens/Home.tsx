import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Brand from '../components/Brand';
import Button from '../components/Button';
import useSpotifyToken from '../custom-hooks/useSpotifyToken';

const spotifyAuthEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'd9d505e880594b7ca174cf7feeb525ea';
const redirectUri = 'http://localhost:3000/';
const scopes = ['user-top-read'];

const HomeScreen: React.FC = () => {
  const [token, { readToken, saveToken }] = useSpotifyToken();
  const history = useHistory();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      saveToken(
        hash
          .replace('#', '')
          .split('&')[0]
          .split('=')[1]
      );

      history.push('/setup-game');
    }
  }, []);

  const spotifySignIn = () => {
    if (!token && !readToken()) {
      window.location.href = `${spotifyAuthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        '%20'
      )}&response_type=token&show_dialog=true`;
    } else {
      history.push('/setup-game');
    }
  };

  return (
    <>
      <Brand />
      <Button size="lg" onClick={spotifySignIn} block>
        Start Game
      </Button>
    </>
  );
};

export default HomeScreen;
