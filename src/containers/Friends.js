// @flow
import * as React from 'react';
import withUserListType from 'hocs/withUserListType';
import useDocumentTitle from 'hooks/useDocumentTitle';
import UserList from 'containers/UserList';
import SectionHeader from 'components/SectionHeader';

import styled from '@emotion/styled';
import { media, spacing } from 'theme/sizes';

const FriendsList = withUserListType('FRIENDS')(UserList);
const FriendRequests = withUserListType('FRIEND_REQUESTS')(UserList);

const Container = styled.div`
  margin: ${spacing(2, 0, 2, 2)};
  display: flex;

  ${media.tablet(`margin: ${spacing(2)};`)}
`;

const Main = styled.div`
  flex: 2 0 0;
  margin-right: ${spacing(4)};
  ${media.tablet`margin-right: 0;`}
`;

const Aside = styled.aside`
  flex: 1 0 0;
  margin-top: ${spacing(2)};
`;

export default function Friends(props) {
  useDocumentTitle('Friends');
  return (
    <Container>
      <Main>
        <FriendsList {...props} searchable />
      </Main>
      <Aside>
        <SectionHeader>Friend Requests</SectionHeader>
        <FriendRequests {...props} />
      </Aside>
    </Container>
  );
}
