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
    setPlayed(0);
  }, [src]);

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
  }, [src]);

  return (
    <>
      <ProgressBar>
        <ProgressBarLine style={{ width: `${(played / total) * 100}%` }} />
      </ProgressBar>
      <audio ref={audioEl} src={src} autoPlay />
    </>
  );
};

const ProgressBar = styled.div`
  height: 15px;
  background: #ccc;
  border: 1px solid #444;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 40px;
`;

const ProgressBarLine = styled.div`
  background: var(--yellow-color);
  height: 100%;
`;

export default AudioPlayer;
