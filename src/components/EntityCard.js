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
import Image, { IMG_SIZES } from 'components/Image';

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
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: ${IMG_SIZES.xlarge}px;
  overflow: hidden;
  border-radius: 4px;
  background-color: ${colors.white};
  color: ${colors.text.primary};
  ${common.shadow}
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
  ${typography.h4}
  line-height: 18px;
  font-weight: 500;
  padding: ${spacing(3, 2)};
  flex-grow: 1;
  display: flex;
  align-items: center;
  text-align: center;
`;

function EntityCard({ entity, linkable, small, type, onClick }: Props) {
  const content = (
    <>
      <Image size={small ? 'medium' : 'xlarge'} src={entity.imageUrl} />
      <Content>{small ? entity[type === 'user' ? 'firstName' : 'lastName'] : entity.fullName}</Content>
    </>
  );
  if (linkable) return <StyledLink to={`/${type}/${entity.id}`}>{content}</StyledLink>;
  if (onClick !== null) return <Button onClick={onClick}>{content}</Button>;
  return <Container>{content}</Container>;
};

EntityCard.defaultProps = {
  linkable: false,
  small: false,
  type: 'user',
  onClick: null,
};
EntityCard.displayName = 'EntityCard';

export default EntityCard;
