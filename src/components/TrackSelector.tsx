import React, { useState, useContext, useEffect } from 'react';
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

  useEffect(() => {
    setIsChoosen(false);
    setChoosenId('');
  }, [selected]);

  const handleClick = (trackId: string) => {
    setIsChoosen(true);
    setChoosenId(trackId);

    if (trackId === selected) {
      dispatch(incrementPointsAction());
    } else {
      // Clear points
    }
  };

  return (
    <>
      <StyledList>
        {tracks.map(({ id, album, name }) => {
          const success = isChoosen && id === choosenId && choosenId === selected;
          const error = isChoosen && id === choosenId && choosenId !== selected;
          const played = isChoosen && id !== choosenId && id === selected;

          return (
            <StyledItem key={`track_${id}`}>
              <StyledOption
                success={success}
                error={error}
                played={played}
                onClick={() => handleClick(id)}
                disabled={isChoosen}
              >
                <StyledImage src={album.images[1].url} alt="" />
                <StyledTitle>{name}</StyledTitle>
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
  margin: -10px -10px 40px;
`;

const StyledItem = styled.li`
  width: 50%;
  padding: 10px;
`;

const StyledImage = styled.img`
  width: 100%;
`;

const StyledTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const StyledOption = styled.button<{ success?: boolean; error?: boolean; played?: boolean }>`
  display: block;
  padding: 0;
  border: 0;
  font-family: sans-serif;
  background: transparent;

  ${props =>
    props.success &&
    css`
      color: #38c172;
    `}
  
  ${props =>
    props.error &&
    css`
      color: red;
    `}

  ${props =>
    props.played &&
    css`
      color: #38c172;
    `}

  &:disabled:hover {
    cursor: not-allowed;
  }
`;

export default TrackSelector;
