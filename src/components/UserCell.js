// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { type User } from 'types/user';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import common from 'theme/common';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';
import Image from 'components/Image';

type Props = {
  emphasized: boolean,
  inList: boolean,
  linkable: boolean,
  user: User,
  renderMeta: () => React.Node,
  onClick: () => void | null,
};

const containerStyles = props => `
  display: flex;
  background-color: ${colors.white};
  padding: ${spacing(2)};
  align-items: center;
  ${props.inList && `border-bottom: 1px solid ${colors.borders.cell};`}
`;

const StyledLink = styled(Link, { shouldForwardProp: prop => prop !== 'inList' })`
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
  ${typography.h4}
  color: ${colors.text.primary};
  margin: ${spacing(0, 2)};
  text-align: left;
  ${props => props.full && 'flex: 1 0 0;'}
  ${props => props.emphasized && 'font-weight: bold;'}
`;

function UserCell({ emphasized, inList, linkable, user, renderMeta, onClick }: Props) {
  const content = (
    <>
      <Image bordered rounded size="small" src={user.imageUrl} />
      <Content emphasized={emphasized} full={inList}>{user.fullName}</Content>
      {renderMeta()}
    </>
  );
  if (linkable) return <StyledLink to={`/user/${user.id}`} inList={inList}>{content}</StyledLink>;
  if (onClick !== null) return <Button onClick={onClick} inList={inList}>{content}</Button>;
  return linkable ? <StyledLink to={`/user/${user.id}`} inList={inList}>{content}</StyledLink> : <Container inList={inList}>{content}</Container>;
};

UserCell.defaultProps = {
  emphasized: false,
  linkable: false,
  renderMeta: (): React.Node => null,
  onClick: null,
};
UserCell.displayName = 'UserCell';

export default UserCell;
