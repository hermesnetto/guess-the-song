import styled, { css } from 'styled-components';

/**
 * @TODO Check type props not workign
 */
interface ButtonProps {
  style?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
}

const Button = styled.button<ButtonProps>`
  border-style: solid;
  border-width: 2px;
  text-decoration: none;
  text-align: center;

  ${props => {
    switch (props.style) {
      case 'secondary':
        return css`
          background: ${props.theme.colors.secondaryButtonBg};
          color: ${props.theme.colors.secondaryButtonColor};
          border-color: ${props.theme.colors.secondaryButtonColor};
        `;
      case 'danger':
        return css`
          background: red;
          color: #fff;
          border-color: #fff;
        `;
      default:
        return css`
          background: ${props.theme.colors.primaryButtonBg};
          color: ${props.theme.colors.primaryButtonColor};
          border-color: ${props.theme.colors.primaryButtonColor};
        `;
    }
  }}


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
          font-size: 18px;
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
