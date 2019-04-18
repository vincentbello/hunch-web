// @flow
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import GET_USERS from 'graphql/queries/getUsers';

import { type Error } from 'types/apollo';
import { type User, type UserListType } from 'types/user';

import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';
import DerivedStateSplash from 'components/DerivedStateSplash';
import Splash from 'components/Splash';
import UserCell from 'components/UserCell';

import styled from '@emotion/styled';

const USER_LIST_EMPTY_MESSAGES = {
  FRIENDS: 'You have no friends.',
  FRIEND_REQUESTS: 'You have no friend requests.',
};

type Props = CurrentUserProps & {
  enterTime: Date,
  userListType: UserListType,
  usersQuery: {
    loading: boolean,
    error: Error,
    networkStatus: number,
    refetch: () => void,
    users: Array<User>,
  },
  userId: number,
};

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`list-style-type: none;`;

function UserList({ currentUser, enterTime, userListType, usersQuery, userId }: Props) {
  React.useEffect(() => {
    console.log('DATA', usersQuery.users);
    if (usersQuery.users) usersQuery.refetch();
  }, [])

  const { loading, error, users } = usersQuery;
  return (
    <DerivedStateSplash error={error} loading={loading}>
      {Boolean(users) && (
        users.length === 0 ? (
          <Splash heading={USER_LIST_EMPTY_MESSAGES[userListType]} visualName="meh-lightbulb" visualType="illustration" />
        ) : (
          <List>
            {users.map((user: User): React.Node => (
              <ListItem key={user.id}>
                <UserCell linkable inList user={user} isMe={currentUser.id !== user.id} />
              </ListItem>
            ))}
          </List>
        )
      )}
    </DerivedStateSplash>
  );
}
UserList.displayName = 'UserList';

export default compose(
  withCurrentUser,
  graphql(GET_USERS, {
    name: 'usersQuery',
    options: ({ match, userListType }) => ({
      variables: {
        userListType,
        userId: match.params.id ? parseInt(match.params.id, 10) : null,
      },
    }),
  })
)(UserList);
