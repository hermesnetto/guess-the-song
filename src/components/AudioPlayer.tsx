import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

interface AudioPlayerProps {
  src: string;
  total: number;
}

let updateSongInterval: number;

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, total }) => {
  const [played, setPlayed] = useState<number>(0);
  const audioEl = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (played === total) {
      if (audioEl.current) {
        audioEl.current.pause();
      }

      if (updateSongInterval) {
        clearInterval(updateSongInterval);
      }
    }
  }, [played, total]);

  useEffect(() => {
    updateSongInterval = setInterval(() => {
      if (audioEl.current?.currentTime) {
        setPlayed(Math.ceil(audioEl.current.currentTime));
      }
    }, 10);
  }, [total]);

  return (
    <div>
      <Title>
        <span role="img" aria-label="radio">
          📻
        </span>{' '}
        Playing song...
      </Title>
      <Wrapper>
        <ProgressBar>
          <ProgressBarLine style={{ width: `${(played / total) * 100}%` }} />
        </ProgressBar>
        <audio src={src} ref={audioEl} autoPlay></audio>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  background: ${props => props.theme.colors.chineseViolet};
  padding: 10px;
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.platinum};
`;

const ProgressBar = styled.div`
  height: 12px;
  background: ${props => props.theme.colors.background};
`;

const ProgressBarLine = styled.div`
  background: ${props => props.theme.colors.platinum};
  height: 100%;
`;

export default AudioPlayer;
