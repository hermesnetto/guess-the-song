import { buildUrlParams } from '../utils';

const spotifyAuthEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'd9d505e880594b7ca174cf7feeb525ea';
const scopes = ['user-top-read'];
const redirectUri =
  process.env.NODE_ENV === 'production'
    ? 'https://hermesnetto.github.io/guess-the-song/'
    : 'http://localhost:4000/';

type UseSpotifySignInResponse = () => void;

const useSpotifySignIn = (): UseSpotifySignInResponse => {
  const signIn = () => {
    const paramsArr = [
      ['client_id', clientId],
      ['redirect_uri', redirectUri],
      ['scope', scopes.join('%20')],
      ['response_type', 'token'],
      ['show_dialog', 'true'],
    ];
    const params = buildUrlParams(paramsArr);

    window.location.href = `${spotifyAuthEndpoint}?${params}`;
  };

  return signIn;
};

export default useSpotifySignIn;
