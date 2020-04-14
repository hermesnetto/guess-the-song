import React, { useReducer, useEffect, Dispatch, useContext } from 'react';

import Button from '../components/Button';
import OptionsSelector from '../components/OptionsSelector';
import optionsReducer, { Action, setItemsAction, toggleItemAction } from '../store/reducer/options';
import useSpotifyToken from '../custom-hooks/useSpotifyToken';
import { GENRES } from '../constants';
import { setGenresAction, setDifficultyAction, switchGameStateAction } from '../store/global';
import { StoreContext } from '../store';
import { OptionSelector } from '../types';

const SetupScreen: React.FC = () => {
  const { dispatch } = useContext(StoreContext);
  const [genres, dispatchGenres] = useReducer(optionsReducer, { items: [] });
  const [difficulties, dispatchDifficulties] = useReducer(optionsReducer, { items: [] });
  const { token } = useSpotifyToken();

  useEffect(() => {
    /**
     * @TODO Allow selecting at max 3 genres
     */
    dispatchGenres(
      setItemsAction(
        GENRES.map((g: string) => ({
          id: g,
          title: g,
          selected: false,
        }))
      )
    );

    dispatchDifficulties(
      setItemsAction([
        { id: 'easy', title: 'Easy', selected: false },
        { id: 'medium', title: 'Medium', selected: true },
        { id: 'hard', title: 'Hard', selected: false },
      ])
    );
  }, [token]);

  const handleToggleItem = (dispatch: Dispatch<Action>) => (id: string, multiple?: boolean) => {
    dispatch(toggleItemAction(id, multiple));
  };

  const handleStartGame = () => {
    dispatch(setGenresAction(genres.items.filter((g: OptionSelector) => g.selected)));
    dispatch(
      setDifficultyAction(difficulties.items.filter((d: OptionSelector) => d.selected)[0].id)
    );

    dispatch(switchGameStateAction('PLAYING'));
  };

  return (
    <>
      <OptionsSelector
        title="Select the genres you want to guess"
        options={genres.items}
        toggleItem={handleToggleItem(dispatchGenres)}
        limit={3}
        multiple
      />
      <OptionsSelector
        title="Select the difficulty"
        toggleItem={handleToggleItem(dispatchDifficulties)}
        options={difficulties.items}
      />
      <Button onClick={handleStartGame}>Start Game</Button>
    </>
  );
};

export default SetupScreen;
