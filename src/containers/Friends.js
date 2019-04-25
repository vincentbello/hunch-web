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
  margin: ${spacing(3, 0, 2, 2)};
  display: flex;

  ${media.mobile(`flex-direction: column;`)}
`;

const Main = styled.div`
  flex: 2 0 0;
  margin-right: ${spacing(4)};
  ${media.mobile`order: 2;`}
`;

const Aside = styled.aside`
  flex: 1 0 0;
  ${media.mobile`order: 1;`}
`;

export default function Friends(props) {
  useDocumentTitle('Friends');
  return (
    <Container>
      <Main>
        <SectionHeader>My Friends</SectionHeader>
        <FriendsList {...props} viewType="card" searchable />
      </Main>
      <Aside>
        <SectionHeader>Friend Requests</SectionHeader>
        <FriendRequests {...props} aside />
      </Aside>
    </Container>
  );
}
