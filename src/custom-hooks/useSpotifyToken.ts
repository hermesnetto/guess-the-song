import { useState, useEffect } from 'react';

interface UseSpotifyTokenActions {
  readToken: () => string | null;
  saveToken: (token: string) => void;
}

const useSpotifyToken = (): { token: string | null; actions: UseSpotifyTokenActions } => {
  const [token, setToken] = useState<string>('');
  const key = 'gts-spotify-token';

  useEffect(() => {
    const value = readToken();
    if (value) {
      setToken(value);
    }
  }, []);

  const readToken = (): string | null => {
    return localStorage.getItem(key);
  };

  const saveToken = (token: string): void => {
    localStorage.setItem(key, token);
    setToken(token);
  };

  return { token, actions: { readToken, saveToken } };
};

export default useSpotifyToken;
