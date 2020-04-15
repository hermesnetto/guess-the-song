import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import AudioPlayer from '../components/AudioPlayer';
import useSpotifyToken from '../custom-hooks/useSpotifyToken';
import useSpotifySignIn from '../custom-hooks/useSpotifySignIn';
import { StoreContext } from '../store';
import TrackSelector from '../components/TrackSelector';
import PageTitle from '../components/PageTitle';
import useFetchTracks from '../custom-hooks/useFetchTracks';

const GameScreen: React.FC = () => {
  const { state: store } = useContext(StoreContext);
  const { token, actions } = useSpotifyToken();
  const signIn = useSpotifySignIn();
  const { state, tracks, selected, fetchMoreTracks } = useFetchTracks(token, store.genres);

  useEffect(() => {
    if (state === 'error') {
      actions.saveToken('');
      signIn();
    }
  }, [state, actions, signIn]);

  return (
    <>
      <PageTitle right={`Pts: ${store.points}`}>Playing: </PageTitle>
      {selected.id && (
        <AudioPlayer src={selected.preview_url} total={parseInt(store.difficulty, 10)} />
      )}
      <TrackSelector tracks={tracks} selected={selected.id} />
      <StyledBtnGroup>
        <Button onClick={fetchMoreTracks}>Next Track</Button>
      </StyledBtnGroup>
    </>
  );
};

const StyledBtnGroup = styled.div`
  display: flex;
  margin-left: -10px;
  margin-right: -10px;

  button {
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
  }
`;

export default GameScreen;
