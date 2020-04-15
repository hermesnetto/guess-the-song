import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledText>Created by: Hermes Netto</StyledText>
      <StyledText>
        <a
          href="http://github.com/guess-the-game"
          title="Link to the Github repository of the project"
        >
          http://github.com/guess-the-game
        </a>
      </StyledText>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin-top: 40px;
`;

const StyledText = styled.p`
  font-size: 20px;
  margin: 0 0 10px;
`;

export default Footer;
