import React, { useState, useReducer, useEffect } from 'react';

import Brand from '../components/Brand';
import OptionsSelector from '../components/OptionsSelector';
import optionsReducer from '../state/options/reducer';
import styled from 'styled-components';
import useProtectedRouter from '../custom-hooks/useProtectedRouter';

const GameScreen: React.FC = () => {
  const [genres, dispatch] = useReducer(optionsReducer, { items: [] });
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useProtectedRouter();

  useEffect(() => {
    window.setTimeout(() => {
      setIsPlaying(false);
    }, 1500);

    dispatch({
      type: 'options/SET-ITEMS',
      payload: {
        items: [
          { id: 'song1', title: 'Disturbed - The sound of silence', selected: false },
          { id: 'song2', title: 'AC/DC - Back in black', selected: false },
          { id: 'song3', title: "Type O-Negative - My girlfriend's girlfriend", selected: false },
          { id: 'song4', title: 'Type O-Negative - Love you to death', selected: false },
        ],
      },
    });
  }, []);

  const handleToggleItem = (id: string, multiple?: boolean) => {
    dispatch({
      type: 'options/TOGGLE-ITEM',
      payload: { id, multiple },
    });
  };

  return (
    <>
      <Brand small />
      <Song>
        <audio controls>
          <source src="myAudio.mp3" type="audio/mpeg" />
          <source src="myAudio.ogg" type="audio/ogg" />
        </audio>
      </Song>

      {!isPlaying && (
        <OptionsSelector
          title="Which song has just played?"
          options={genres.items}
          toggleItem={handleToggleItem}
          fullWidth
        />
      )}
    </>
  );
};

const Song = styled.div`
  margin-bottom: 40px;
`;

export default GameScreen;
