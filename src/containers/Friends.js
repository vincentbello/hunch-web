// @flow
import * as React from 'react';
import { Query } from 'react-apollo';
import GET_USER from 'graphql/queries/getUser';
import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';
import withUserListType from 'hocs/withUserListType';
import useDocumentTitle from 'hooks/useDocumentTitle';
import UserList from 'containers/UserList';
import SectionHeader from 'components/SectionHeader';
import type { RouterProps } from 'types/router';

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

type Props = RouterProps & CurrentUserProps & {};

function Friends(props: Props) {
  useDocumentTitle('Friends');
  return (
    <Container>
      <Main>
        <SectionHeader>
          {!props.match.params.id || props.match.params.id === `${props.currentUser.id}` ? (
            'My '
          ) : (
            <Query query={GET_USER} variables={{ id: parseInt(props.match.params.id, 10) }}>
              {({ data: { user } }) => Boolean(user) && `${user.fullName}'s `}
            </Query>
          )}
          Friends
        </SectionHeader>
        <FriendsList {...props} viewType="card" searchable />
      </Main>
      {!props.match.params.id && (
        <Aside>
          <SectionHeader>Friend Requests</SectionHeader>
          <FriendRequests {...props} aside />
        </Aside>
      )}
    </Container>
  );
}

export default withCurrentUser(Friends);
