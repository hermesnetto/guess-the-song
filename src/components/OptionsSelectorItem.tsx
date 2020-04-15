import React from 'react';
import styled, { css } from 'styled-components';

import { OptionSelector } from '../types';

interface OptionsSelectorItemProps extends OptionSelector {
  toggleItem: (id: string, multiple?: boolean) => void;
  multiple?: boolean;
  fullWidth?: boolean;
  limit?: number;
  totalSelected: number;
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
  limit,
  totalSelected,
}) => {
  const handleClick = () => {
    if (!selected) {
      if (!limit) {
        toggleItem(id, multiple);
      } else if (limit && totalSelected < limit) {
        toggleItem(id, multiple);
      }
    } else {
      toggleItem(id, multiple);
    }
  };

  return (
    <Item selected={selected} fullWidth={fullWidth} onClick={handleClick}>
      {title}
    </Item>
  );
};

const Item = styled.button<ItemProps>`
  padding: 10px;
  margin: 5px;
  font-size: 20px;
  border: 0;
  border-radius: 5px;

  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  ${props =>
    props.selected &&
    css`
      background: var(--blue-color);
      color: #fff;
      font-weight: bold;
    `}

  ${props =>
    !props.selected &&
    css`
      border: 1px solid var(--grey-color);
      color: var(--grey-color);
      background: transparent;
    `}
`;

export default OptionsSelectorItem;
