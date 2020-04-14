import React from 'react';
import styled, { css } from 'styled-components';

interface BrandProps {
  small?: boolean;
}

const Brand: React.FC<BrandProps> = ({ small }) => {
  return <StyledBrand small={small}>Guess the Song</StyledBrand>;
};

const StyledBrand = styled.h1<BrandProps>`
  font-family: 'Special Elite', cursive;
  color: ${props => props.theme.colors.chineseViolet};
  font-size: ${props => (props.small ? '26px' : '82px')};
  font-weight: bold;
  margin-top: ${props => (props.small ? '30px' : '80px')};

  ${props =>
    props.small &&
    css`
      margin-bottom: 20px;
      text-align: center;
    `}
`;

export default Brand;
