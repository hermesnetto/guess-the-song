import styled, { css } from 'styled-components';

/**
 * @TODO Check type props not workign
 */
interface ButtonProps {
  themeStyle?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
}

const Button = styled.button<ButtonProps>`
  border-style: solid;
  border-width: 1px;
  text-decoration: none;
  text-align: center;
  border-radius:5px;

  ${props => {
    switch (props.themeStyle) {
      case 'secondary':
        return css`
          background: ${props.theme.colors.secondaryButtonBg};
          color: ${props.theme.colors.secondaryButtonColor};
          border-color: ${props.theme.colors.secondaryButtonColor};
        `;
      default:
        return css`
          background: #38c172;
          color: #fff;
          border-color: #399e64;
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
