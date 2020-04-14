import React, { useContext } from 'react';

import Button from '../components/Button';
import AudioPlayer from '../components/AudioPlayer';
import styled from 'styled-components';
import useSpotifyToken from '../custom-hooks/useSpotifyToken';
import { StoreContext } from '../store';
import TrackSelector from '../components/TrackSelector';
import PageTitle from '../components/PageTitle';
import PlayerAnimation from '../components/PlayerAnimation';
import useFetchTracks from '../custom-hooks/useFetchTracks';

const GameScreen: React.FC = () => {
  const { state } = useContext(StoreContext);
  const { token } = useSpotifyToken();
  const { tracks, selected } = useFetchTracks(token, state.genres);

  return (
    <>
      <PageTitle right={`Pts: ${state.points}`}>Playing</PageTitle>
      {selected.id && (
        <Song>
          <AudioPlayer src={selected.preview_url} total={parseInt(state.difficulty, 10)} />
        </Song>
      )}
      <PlayerAnimation />
      <TrackSelector tracks={tracks} selected={selected.id} />
      <Button themeStyle="secondary">Reiniciar</Button>
    </>
  );
};

const Song = styled.div`
  margin-bottom: 10px;
`;

export default GameScreen;
