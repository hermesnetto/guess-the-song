import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';

import { SpotifyTrack } from '../types';

import { StoreContext } from '../store';
import { incrementPointsAction } from '../store/global';

interface TrackSelectorProps {
  tracks: SpotifyTrack[];
  selected: string;
}

const TrackSelector: React.FC<TrackSelectorProps> = ({ tracks, selected }) => {
  const { dispatch } = useContext(StoreContext);
  const [isChoosen, setIsChoosen] = useState<boolean>(false);
  const [choosenId, setChoosenId] = useState<string>('');

  const handleClick = (trackId: string) => {
    setIsChoosen(true);
    setChoosenId(trackId);

    if (trackId === selected) {
      dispatch(incrementPointsAction());
    }
  };

  return (
    <>
      <StyledList>
        {tracks.map(({ id, artists, name }) => {
          const success = isChoosen && id === choosenId && choosenId === selected;
          const error = isChoosen && id === choosenId && choosenId !== selected;
          const played = isChoosen && id !== choosenId && id === selected;

          return (
            <StyledItem>
              <StyledOption
                success={success}
                error={error}
                played={played}
                onClick={() => handleClick(id)}
                key={`track_${id}`}
              >
                {artists[0].name} - {name}
              </StyledOption>
            </StyledItem>
          );
        })}
      </StyledList>
    </>
  );
};

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const StyledItem = styled.li`
  width: 100%;
  margin-bottom: 15px;
`;

const StyledOption = styled.button<{ success?: boolean; error?: boolean; played?: boolean }>`
  width: 100%;
  display: block;
  padding: 15px;
  border: 1px solid tomato;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #206baf;
  border-radius: 5px;
  color: #fff;
  font-family: sans-serif;
  background: #3f96e4;

  ${props =>
    props.success &&
    css`
      background: #38c172;
    `}
  
  ${props =>
    props.error &&
    css`
      background: red;
    `}

  ${props =>
    props.played &&
    css`
      background: #38c172;
    `}
`;

export default TrackSelector;
