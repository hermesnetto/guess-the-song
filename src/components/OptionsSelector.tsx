import React from 'react';
import styled from 'styled-components';

import { OptionSelector } from '../types';
import OptionsSelectorItem from './OptionsSelectorItem';
import PageTitle from './PageTitle';

interface OptionsSelectorProps {
  title: string;
  subtitle?: string;
  options: OptionSelector[];
  multiple?: boolean;
  fullWidth?: boolean;
  limit?: number;
  toggleItem: (id: string, multiple?: boolean) => void;
}

const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  title,
  subtitle,
  options,
  toggleItem,
  multiple,
  fullWidth,
  limit,
}) => {
  const totalSelected = options.filter((item: OptionSelector) => item.selected).length;

  return (
    <StyledWrapper>
      <PageTitle>{title}</PageTitle>
      {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
      <StyledList>
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
      </StyledList>
    </StyledWrapper>
  );
};

OptionsSelector.defaultProps = {
  multiple: false,
  fullWidth: false,
};

const StyledWrapper = styled.div`
  margin-bottom: 40px;
`;

const StyledSubtitle = styled.h3`
  font-weight: 400;
  color: #333;
`;

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -5px;
`;

export default OptionsSelector;
