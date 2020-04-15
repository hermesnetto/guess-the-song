import styled, { css } from 'styled-components';

/**
 * @TODO Check type props not workign
 */
interface ButtonProps {
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
}

const Button = styled.button<ButtonProps>`
  border-style: solid;
  border-width: 1px;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  background: var(--green-color);
  border-color: var(--green-dark-color);
  color: #fff;

  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          font-size: 12px;
          padding: 10px;
        `;
      case 'lg':
        return css`
          font-size: 30px;
          padding: 20px;
        `;
      default:
        return css`
          font-size: 20px;
          padding: 12px 20px;
        `;
    }
  }}

  ${props =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
`;

export default Button;
