import React from 'react';
import styled, { css } from 'styled-components';

import { OptionSelector } from '../types';

interface OptionsSelectorItemProps extends OptionSelector {
  toggleItem: (id: string, multiple?: boolean) => void;
  multiple?: boolean;
  fullWidth?: boolean;
}

interface ItemProps {
  selected: boolean;
  fullWidth?: boolean;
}

const OptionsSelectorItem: React.FC<OptionsSelectorItemProps> = ({
  id,
  title,
  selected,
  toggleItem,
  multiple,
  fullWidth,
}) => {
  const handleClick = () => toggleItem(id, multiple);

  return (
    <Item selected={selected} fullWidth={fullWidth} onClick={handleClick}>
      {title}
    </Item>
  );
};

const Item = styled.button<ItemProps>`
  padding: 10px;
  margin: 5px;
  font-size: 16px;
  border: 0;

  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  ${props =>
    props.selected &&
    css`
      background: ${props.theme.colors.mediumAquamarine};
      color: ${props.theme.colors.background};
      font-weight: bold;
    `}

  ${props =>
    !props.selected &&
    css`
      border: 1px solid ${props.theme.colors.mediumAquamarine};
      color: ${props.theme.colors.mediumAquamarine};
      background: transparent;
    `}
`;

export default OptionsSelectorItem;