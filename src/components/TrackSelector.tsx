import React from 'react';
import styled from 'styled-components';

import { OptionSelector } from '../types';

interface TrackSelectorProps {
  tracks: OptionSelector[];
  track: string;
}

const TrackSelector: React.FC<TrackSelectorProps> = ({ tracks }) => {
  return (
    <div>
      <lottie-player
        src="https://assets8.lottiefiles.com/packages/lf20_CyEC2p.json"
        background="#38c172"
        speed="1"
        style={{ width: '100vw', height: 200, marginLeft: '-30px', marginBottom: 30 }}
        loop
        autoplay
      />
      <StyledList>
        {tracks.map(track => (
          <StyledItem>
            <StyledOption>{track.title}</StyledOption>
          </StyledItem>
        ))}
      </StyledList>
    </div>
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
  background: ${props => {
    if (props.success) {
      return '#38c172';
    }

    if (props.error) {
      return 'red';
    }

    if (props.played) {
      return '#cdcdcd';
    }

    return '#3f96e4';
  }};

  &:hover {
    background: #206baf;
  }
`;

export default TrackSelector;
