// @flow
import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { type Hunch } from 'types/hunch';
import { type Game } from 'types/game';
import { type Message } from 'types/message';
import { type User } from 'types/user';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import common from 'theme/common';
import colors from 'theme/colors';
import typography from 'theme/typography';
import { spacing } from 'theme/sizes';

import Image from 'components/Image';

type Props = { byMe: boolean, message: Message };

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.byMe ? 'flex-end' : 'flex-start'};
`;

const ImageContainer = styled.div`align-self: flex-end`;

const Content = styled.div`
  padding: ${spacing(2)};
  max-width: 65%;
  ${props => css`
    background-color: ${props.byMe ? colors.brand.primary : colors.background};
    border-radius: ${props.byMe ? spacing(2, 2, 1, 2) : spacing(2, 2, 2, 1)};
    margin: ${props.byMe ? spacing(0, 2, 0, 0) : spacing(0, 0, 0, 2)};
    text-align: ${props.byMe ? 'right' : 'left'};
    color: ${props.byMe ? colors.white : colors.text.primary};
  `}
`;

export default function FeedMessage({ byMe, message }: Props) {
  const image = <ImageContainer><Image bordered rounded size="xsmall" src={message.author.imageUrl} /></ImageContainer>;

  return (
    <Container byMe={byMe}>
      {!byMe && image}
      <Content byMe={byMe}>{message.content}</Content>
      {byMe && image}
    </Container>
  );
}
FeedMessage.defaultProps = { byMe: false };


