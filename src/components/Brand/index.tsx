import React from 'react';
import styled, { css } from 'styled-components';

interface BrandProps {
  small?: boolean;
}

const Brand: React.FC<BrandProps> = ({ small }) => {
  return <SBrand small={small}>Guess the Song</SBrand>;
};

const SBrand = styled.h1<BrandProps>`
  color: ${props => props.theme.colors.title};
  font-size: ${props => (props.small ? '32px' : '82px')};
  font-weight: bold;
  margin-top: 80px;

  ${props =>
    props.small &&
    css`
      margin-bottom: 20px;
    `}
`;

export default Brand;
