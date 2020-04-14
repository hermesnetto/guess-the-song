import React, { useContext, useState, useReducer, useEffect } from 'react';

import Button from '../components/Button';
import AudioPlayer from '../components/AudioPlayer';
import optionsReducer, { setItemsAction } from '../store/reducer/options';
import styled from 'styled-components';
import useSpotifyToken from '../custom-hooks/useSpotifyToken';
import { StoreContext } from '../store';
import { getRandomInt, convertTrackIntoOption } from '../utils';
import { OptionSelector } from '../types';
import TrackSelector from '../components/TrackSelector';
import PageTitle from '../components/PageTitle';

const playerDuration = 15;

const GameScreen: React.FC = () => {
  const { state } = useContext(StoreContext);
  const [songs, dispatch] = useReducer(optionsReducer, { items: [] });
  const [song, setSong] = useState<string>('');

  const { token } = useSpotifyToken();

  useEffect(() => {
    // Wait for the token to be retrieved
    const genres = state.genres.map((g: OptionSelector) => g.id).join(',');

    if (token) {
      fetch(
        `https://api.spotify.com/v1/recommendations?limit=4&seed_genres=${genres}%2Cpsychobilly&min_popularity=60&max_popularity=100&target_popularity=100`,
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
          dispatch(setItemsAction(convertTrackIntoOption(response)));
          setSong(response.tracks[getRandomInt(1, 4)].preview_url);
        });
    }
  }, [token, state.genres]);

  return (
    <>
      <PageTitle right="Pts: 1">Playing</PageTitle>

      {song && (
        <Song>
          <AudioPlayer src={song} total={playerDuration} />
        </Song>
      )}

      <TrackSelector tracks={songs.items} track="" />
      <Button themeStyle="secondary">Reiniciar</Button>
    </>
  );
};

const Song = styled.div`
  margin-bottom: 10px;
`;

export default GameScreen;
