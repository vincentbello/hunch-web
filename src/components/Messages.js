// @flow
import * as React from 'react';

import { type Message } from 'types/message';
import { type User } from 'types/user';

import styled from '@emotion/styled';
import { spacing } from 'theme/sizes';

import FeedMessage from 'components/FeedMessage';

type Props = { currentUser: User, messages: Message[] };

const MessageList = styled.ul`
  margin: 0;
  padding: 0;
`;

const MessageItem = styled.li`
  list-style-type: none;
  margin-bottom: ${spacing(1)};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export default function Messages({ currentUser, messages }: Props) {
  return (
    <MessageList>
      {messages.map((message: Message) => (
        <MessageItem key={message.id}>
          <FeedMessage message={message} byMe={message.author.id === currentUser.id} />
        </MessageItem>
      ))}
    </MessageList>
  );
}
Messages.defaultProps = { messages: [] };
