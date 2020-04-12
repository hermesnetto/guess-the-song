import React, { useReducer, useEffect, Dispatch } from 'react';

import Brand from '../components/Brand';
import Button from '../components/Button';
import OptionsSelector from '../components/OptionsSelector';
import optionsReducer, { Action } from '../state/options/reducer';

const SetupGameScreen: React.FC = () => {
  const [genres, dispatchGenres] = useReducer(optionsReducer, { items: [] });
  const [difficulties, dispatchDifficulties] = useReducer(optionsReducer, { items: [] });

  useEffect(() => {
    dispatchGenres({
      type: 'options/SET-ITEMS',
      payload: {
        items: [
          { id: 'abc1', title: 'Pop', selected: false },
          { id: 'abc2', title: 'Rock', selected: true },
          { id: 'abc3', title: 'Rap', selected: true },
          { id: 'abc4', title: 'Dance', selected: false },
          { id: 'abc5', title: 'Reggae', selected: false },
        ],
      },
    });

    dispatchDifficulties({
      type: 'options/SET-ITEMS',
      payload: {
        items: [
          { id: 'dif1', title: 'Easy', selected: false },
          { id: 'dif2', title: 'Medium', selected: true },
          { id: 'dif3', title: 'Hard', selected: false },
        ],
      },
    });
  }, []);

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
      <Button>Start Game</Button>
    </>
  );
};

export default SetupGameScreen;
