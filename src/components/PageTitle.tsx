import React from 'react';
import styled, { css } from 'styled-components';

interface PageTitleProps {
  right?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, right }) => {
  return (
    <StyledPageTitle right={right}>
      {children}
      {right && right.length && <span>{right}</span>}
    </StyledPageTitle>
  );
};

const StyledPageTitle = styled.h2<PageTitleProps>`
  color: #222;
  margin: 0 0 20px;
  font-family: Arial, Helvetica, sans-serif;

  ${props =>
    props.right &&
    props.right.length &&
    css`
      display: flex;
      justify-content: space-between;
    `}
`;

export default PageTitle;
