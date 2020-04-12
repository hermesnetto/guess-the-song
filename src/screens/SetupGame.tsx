import React, { useReducer, useEffect, Dispatch } from 'react';
import { Link } from 'react-router-dom';

import Brand from '../components/Brand';
import Button from '../components/Button';
import OptionsSelector from '../components/OptionsSelector';
import optionsReducer, { Action } from '../state/options/reducer';
import useProtectedRouter from '../custom-hooks/useProtectedRouter';
import useSpotifyToken from '../custom-hooks/useSpotifyToken';
import { GENRES } from '../constants';

const SetupGameScreen: React.FC = () => {
  const [genres, dispatchGenres] = useReducer(optionsReducer, { items: [] });
  const [difficulties, dispatchDifficulties] = useReducer(optionsReducer, { items: [] });
  const [token] = useSpotifyToken();

  useProtectedRouter();

  useEffect(() => {
    // fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
    //   method: 'GET',
    //   headers: new Headers({
    //     Authorization: `Bearer ${token || ''}`,
    //     'Content-Type': 'application/json',
    //   }),
    // })
    //   .then(r => r.json())
    //   .then(r => console.table(r.genres));

    /**
     * @TODO Allow selecting at max 3 genres
     */
    dispatchGenres({
      type: 'options/SET-ITEMS',
      payload: {
        items: GENRES.map((g: string) => ({
          id: g,
          title: g,
          selected: false,
        })),
      },
    });

    dispatchDifficulties({
      type: 'options/SET-ITEMS',
      payload: {
        items: [
          { id: 'easy', title: 'Easy', selected: false },
          { id: 'medium', title: 'Medium', selected: true },
          { id: 'hard', title: 'Hard', selected: false },
        ],
      },
    });
  }, [token]);

  const handleToggleItem = (dispatch: Dispatch<Action>) => (id: string, multiple?: boolean) => {
    dispatch({
      type: 'options/TOGGLE-ITEM',
      payload: { id, multiple },
    });
  };

  return (
    <>
      <Brand small />
      <OptionsSelector
        title="Select the genres you want to guess"
        options={genres.items}
        toggleItem={handleToggleItem(dispatchGenres)}
        multiple
      />
      <OptionsSelector
        title="Select the difficulty"
        toggleItem={handleToggleItem(dispatchDifficulties)}
        options={difficulties.items}
      />
      <Button as={Link} to="/game">
        Start Game
      </Button>
    </>
  );
};

export default SetupGameScreen;
