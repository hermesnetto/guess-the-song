import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useSpotifyToken from './useSpotifyToken';

const useProtectedRouter = () => {
  const [token, { readToken }] = useSpotifyToken();
  const history = useHistory();

  useEffect(() => {
    if (!token && !readToken()) {
      history.push('/setup-game');
    }
  }, [token, history, readToken]);
};

export default useProtectedRouter;
