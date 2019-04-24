// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { type User } from 'types/user';
import { type Team } from 'types/team';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import common from 'theme/common';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';
import Image from 'components/Image';

type Props = {
  centered: boolean,
  emphasized: boolean,
  entity: User | Team,
  inList: boolean,
  lightMode: boolean,
  linkable: boolean,
  small: boolean,
  type: 'user' | 'team',
  renderMeta: () => React.Node,
  onClick: () => void | null,
};

const containerStyles = props => `
  display: flex;
  background-color: ${props.lightMode ? colors.transparent : colors.white};
  padding: ${props.lightMode ? 0 : spacing(2, props.small ? 1 : 2)};
  color: ${props.lightMode ? colors.offwhite : colors.text.primary};
  align-items: center;
  ${props.centered ? `justify-content: center;` : ''}
  ${props.inList ? `border-bottom: 1px solid ${colors.borders.cell};` : ''}

  &:hover {
    color: ${props.lightMode ? colors.white : colors.text.primary};
  }
`;

const StyledLink = styled(Link, { shouldForwardProp: prop => !['inList', 'lightMode', 'small'].includes(prop) })`
  ${common.reset.link}
  ${containerStyles}
`;
const Container = styled.div(containerStyles);
const Button = styled.button`
  border: none;
  ${containerStyles};
  transition: background-color 200ms;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${colors.offwhite};
  }
`;

const Content = styled.div`
  ${props => props.small ? typography.h5 : typography.h4}
  ${props => props.lightMode && `font-size: 16px;`}
  margin: ${props => props.small ? spacing(0, 0, 0, 1) : spacing(0, 2)};
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  ${props => props.full && `flex: 1 0 0;`}
  ${props => props.emphasized && `font-weight: bold;`}
`;

function EntityCell({ centered, emphasized, entity, inList, lightMode, linkable, small, type, renderMeta, onClick }: Props) {
  const containerProps = { centered, inList, lightMode, small };
  const content = (
    <>
      <Image bordered={!small} rounded size={small ? 'xxsmall' : 'small'} src={entity.imageUrl} />
      <Content emphasized={emphasized} lightMode={lightMode} full={inList} small={small}>
        {small ? entity[type === 'user' ? 'firstName' : 'lastName'] : entity.fullName}
      </Content>
      {renderMeta()}
    </>
  );
  if (linkable) return <StyledLink to={`/${type}/${entity.id}`} {...containerProps}>{content}</StyledLink>;
  if (onClick !== null) return <Button onClick={onClick} {...containerProps}>{content}</Button>;
  return <Container {...containerProps}>{content}</Container>;
};

EntityCell.defaultProps = {
  emphasized: false,
  lightMode: false,
  linkable: false,
  small: false,
  type: 'user',
  renderMeta: (): React.Node => null,
  onClick: null,
};
EntityCell.displayName = 'EntityCell';

export default EntityCell;
