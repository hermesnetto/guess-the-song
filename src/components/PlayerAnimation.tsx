import React from 'react';

const PlayerAnimation: React.FC = () => {
  return (
    <lottie-player
      src="https://assets8.lottiefiles.com/packages/lf20_CyEC2p.json"
      background="#38c172"
      speed="1"
      style={{ width: '100vw', height: 150, marginLeft: '-30px', marginBottom: 30 }}
      loop
      autoplay
    />
  );
};

export default PlayerAnimation;
