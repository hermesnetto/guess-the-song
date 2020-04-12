import React from 'react';
import { Link } from 'react-router-dom';

import Brand from '../components/Brand';
import Button from '../components/Button';

const HomeScreen: React.FC = () => {
  return (
    <>
      <Brand />
      <Button as={Link} to="/setup-game" size="lg" block>
        Start Game
      </Button>
    </>
  );
};

export default HomeScreen;
