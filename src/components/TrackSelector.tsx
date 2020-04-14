import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { OptionSelector } from '../types';

interface TrackSelectorProps {
  tracks: OptionSelector[];
  track: string;
}

const TrackSelector: React.FC<TrackSelectorProps> = ({ tracks, track }) => {
  const [isChoosen, setIsChoosen] = useState<boolean>(false);
  const [choosenId, setChoosenId] = useState<string>('');

  const handleClick = (trackId: string) => {
    setIsChoosen(true);
    setChoosenId(trackId);
  };

  return (
    <>
      <lottie-player
        src="https://assets8.lottiefiles.com/packages/lf20_CyEC2p.json"
        background="#38c172"
        speed="1"
        style={{ width: '100vw', height: 200, marginLeft: '-30px', marginBottom: 30 }}
        loop
        autoplay
      />
      <StyledList>
        {tracks.map(({ id, title }) => {
          const success = isChoosen && id === choosenId && choosenId === track;
          const error = isChoosen && id === choosenId && choosenId !== track;
          const played = isChoosen && id !== choosenId && id === track;

          return (
            <StyledItem>
              <StyledOption
                success={success}
                error={error}
                played={played}
                onClick={() => handleClick(id)}
                key={`track_${id}`}
              >
                {title}
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
