import React from 'react';
import styled from 'styled-components';

import { OptionSelector } from '../types';
import OptionsSelectorItem from './OptionsSelectorItem';
import PageTitle from './PageTitle';

interface OptionsSelectorProps {
  title: string;
  options: OptionSelector[];
  multiple?: boolean;
  fullWidth?: boolean;
  limit?: number;
  toggleItem: (id: string, multiple?: boolean) => void;
}

const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  title,
  options,
  toggleItem,
  multiple,
  fullWidth,
  limit,
}) => {
  const totalSelected = options.filter((item: OptionSelector) => item.selected).length;

  return (
    <Wrapper>
      <PageTitle>{title}</PageTitle>
      <List>
        {options.map(option => (
          <OptionsSelectorItem
            key={option.id}
            multiple={multiple}
            toggleItem={toggleItem}
            fullWidth={fullWidth}
            limit={limit}
            totalSelected={totalSelected}
            {...option}
          />
        ))}
      </List>
    </Wrapper>
  );
};

OptionsSelector.defaultProps = {
  multiple: false,
  fullWidth: false,
};

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -5px;
`;

export default OptionsSelector;
