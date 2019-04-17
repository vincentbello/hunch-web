// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

export type Option = {
  icon?: React.Node,
  key: string,
  label: string,
  onClick: () => void,
};

type Props = { options: [] };

const List = styled.ul`
  margin: 0;
  padding: 0;
  background-color: ${colors.white};
  border: 1px solid ${colors.borders.main};
`;

const ListItem = styled.li`list-style-type: none;`;

const Button = styled.button`
  display: inline-flex;
  border: none;
  background-color: ${colors.transparent};
  display: flex;
  align-items: center;
  padding: ${spacing(3)};
  color: ${colors.text.primary};
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  transition: background-color 250ms;

  &:hover {
    background-color: rgba(0,0,0,0.15);
  }
`;

const IconWrapper = styled.span`
  position: relative;
  top: 3px;
  margin-right: ${spacing(2)}
`;
const Label = styled.div`flex: 1 0 0;`;

export default function OptionList({ options }: Props) {
  return (
    <List>
      {options.map((option: Option) => (
        <ListItem key={option.key}>
          <Button onClick={option.onClick}>
            {!!option.icon && <IconWrapper>{option.icon}</IconWrapper>}
            <Label>{option.label}</Label>
          </Button>
        </ListItem>
      ))}
    </List>
  );
}
