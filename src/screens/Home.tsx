import React from 'react';
import { useHistory } from 'react-router-dom';

import Brand from '../components/Brand';
import Button from '../components/Button';

const HomeScreen: React.FC = () => {
  const history = useHistory();

  const startGame = () => {
    history.push('/setup-game');
  };

  return (
    <>
      <Brand />
      <Button size="lg" block onClick={startGame}>
        Start Game
      </Button>
    </>
  );
};

export default HomeScreen;
