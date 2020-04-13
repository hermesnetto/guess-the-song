import React, { useState, useReducer, useEffect } from 'react';

import Brand from '../components/Brand';
import OptionsSelector from '../components/OptionsSelector';
import AudioPlayer from '../components/AudioPlayer';
import optionsReducer from '../state/options/reducer';
import styled from 'styled-components';
import useSpotifyToken from '../custom-hooks/useSpotifyToken';
import { getRandomInt, convertTrackIntoOption } from '../utils';

const playerDuration = 15;

const GameScreen: React.FC = () => {
  const [songs, dispatch] = useReducer(optionsReducer, { items: [] });
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [song, setSong] = useState<string>('');

  const [token] = useSpotifyToken();

  // useProtectedRouter();

  useEffect(() => {
    // Wait for the token to be retrieved
    if (token) {
      fetch(
        `https://api.spotify.com/v1/recommendations?limit=4&seed_genres=rockabilly%2Cpsychobilly&min_popularity=60&max_popularity=100&target_popularity=100`,
        {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${token || ''}`,
            'Content-Type': 'application/json',
          }),
        }
      )
        .then(response => response.json())
        .then(response => {
          dispatch({
            type: 'options/SET-ITEMS',
            payload: {
              items: convertTrackIntoOption(response),
            },
          });

          setSong(response.tracks[getRandomInt(1, 4)].preview_url);
          window.setTimeout(() => setIsPlaying(false), playerDuration * 1000);
        });
    }
  }, [token]);

  const handleToggleItem = (id: string, multiple?: boolean) => {
    dispatch({
      type: 'options/TOGGLE-ITEM',
      payload: { id, multiple },
    });
  };

  return (
    <>
      <Brand small />

      {song && (
        <Song>
          <AudioPlayer src={song} total={playerDuration} />
        </Song>
      )}

      {!isPlaying && (
        <OptionsSelector
          title="Which song has just played?"
          options={songs.items}
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
