import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledText>Created by: Hermes Netto</StyledText>
      <StyledText>
        <a
          href="https://github.com/hermesnetto/guess-the-song"
          title="Link to the Github repository of the project"
        >
          https://github.com/hermesnetto/guess-the-song
        </a>
      </StyledText>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin-top: 40px;
  padding-bottom: 20px;
`;

const StyledText = styled.p`
  font-size: 20px;
  margin: 0 0 10px;
`;

export default Footer;
