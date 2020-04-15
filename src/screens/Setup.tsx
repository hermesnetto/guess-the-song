import React, { useReducer, useEffect, Dispatch, useContext } from 'react';

import Button from '../components/Button';
import OptionsSelector from '../components/OptionsSelector';
import optionsReducer, { Action, setItemsAction, toggleItemAction } from '../store/options';
import useSpotifyToken from '../custom-hooks/useSpotifyToken';
import { GENRES } from '../constants';
import { setGenresAction, setDifficultyAction, switchGameStateAction } from '../store/global';
import { StoreContext } from '../store';
import { OptionSelector } from '../types';

const SetupScreen: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
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
        { id: '15', title: 'Easy', selected: false },
        { id: '10', title: 'Medium', selected: true },
        { id: '5', title: 'Hard', selected: false },
      ])
    );
  }, [token]);

  const handleToggleItem = (dispatch: Dispatch<Action>) => (id: string, multiple?: boolean) => {
    dispatch(toggleItemAction(id, multiple));
  };

  const handleStartGame = () => {
    dispatch(
      setGenresAction(
        genres.items.filter((g: OptionSelector) => g.selected).map((g: OptionSelector) => g.id)
      )
    );
    dispatch(
      setDifficultyAction(difficulties.items.filter((d: OptionSelector) => d.selected)[0].id)
    );

    dispatch(switchGameStateAction('PLAYING'));
  };

  const hasGenresSelected = genres.items.filter(i => i.selected).length > 0;
  const difSelected = difficulties.items.filter(i => i.selected);
  const sec = difSelected.length > 0 ? difSelected[0].id : state.difficulty;

  return (
    <>
      <OptionsSelector
        title="Select the genres you want to guess"
        subtitle="Select up to 3 genres"
        options={genres.items}
        toggleItem={handleToggleItem(dispatchGenres)}
        limit={3}
        multiple
      />
      <OptionsSelector
        title="Select the difficulty"
        subtitle={`The song will play for ${sec} seconds`}
        toggleItem={handleToggleItem(dispatchDifficulties)}
        options={difficulties.items}
      />
      <Button onClick={handleStartGame} disabled={!hasGenresSelected}>
        Start Game
      </Button>
    </>
  );
};

export default SetupScreen;
