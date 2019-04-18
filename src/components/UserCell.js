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

const Content = styled.div`
  ${typography.h4}
  color: ${colors.text.primary};
  margin: ${spacing(0, 2)};
  ${props => props.full && 'flex: 1 0 0;'}
  ${props => props.emphasized && 'font-weight: bold;'}
`;

function UserCell({ emphasized, inList, linkable, user, renderMeta }: Props) {
  const content = (
    <>
      <Image bordered rounded size="small" src={user.imageUrl} />
      <Content emphasized={emphasized} full={inList}>{user.fullName}</Content>
      {renderMeta()}
    </>
  );
  return linkable ? <StyledLink to={`/user/${user.id}`} inList={inList}>{content}</StyledLink> : <Container inList={inList}>{content}</Container>;
};

UserCell.defaultProps = {
  emphasized: false,
  linkable: false,
  renderMeta: (): React.Node => null,
};
UserCell.displayName = 'UserCell';

export default UserCell;
