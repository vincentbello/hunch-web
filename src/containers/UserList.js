// @flow
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import GET_USERS from 'graphql/queries/getUsers';

import { type Error } from 'types/apollo';
import { type User, type UserListType } from 'types/user';

import useInputFilter from 'hooks/useInputFilter';
import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';
import DerivedStateSplash from 'components/DerivedStateSplash';
import Splash from 'components/Splash';
import UserCell from 'components/UserCell';

import styled from '@emotion/styled';
import { spacing } from 'theme/sizes';

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

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`list-style-type: none;`;

const Input = styled.input`
  font-size: 15px;
  padding: ${spacing(3, 2)};
  margin: ${spacing(2, 0)};
  outline: none;
  width: 100%;
`;

function UserList({ currentUser, enterTime, userListType, usersQuery, userId }: Props) {
  const [filteredUsers, inputProps] = useInputFilter(usersQuery.users);
  React.useEffect(() => {
    if (usersQuery.users) usersQuery.refetch();
  }, [])

  const { loading, error } = usersQuery;
  return (
    <Container>
      <Input type="text" placeholder="Find a friend..." {...inputProps} />
      <DerivedStateSplash error={error} loading={loading}>
        {filteredUsers.length === 0 ? (
          <Splash heading={USER_LIST_EMPTY_MESSAGES[userListType]} visualName="meh-lightbulb" visualType="illustration" />
        ) : (
          <List>
            {filteredUsers.map((user: User): React.Node => (
              <ListItem key={user.id}>
                <UserCell linkable inList user={user} isMe={currentUser.id !== user.id} />
              </ListItem>
            ))}
          </List>
        )}
      </DerivedStateSplash>
    </Container>
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
