// @flow
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import GET_USERS from 'graphql/queries/getUsers';

import { type Error } from 'types/apollo';
import { type User, type UserListType } from 'types/user';

import useInputFilter from 'hooks/useInputFilter';
import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';
import DerivedStateSplash from 'components/DerivedStateSplash';
import FriendshipDualAction from 'components/FriendshipDualAction';
import { IMG_SIZES } from 'components/Image';
import Splash from 'components/Splash';
import EntityCard from 'components/EntityCard';
import EntityCell from 'components/EntityCell';

import styled from '@emotion/styled';
import { spacing } from 'theme/sizes';

const USER_LIST_EMPTY_MESSAGES = {
  FRIENDS: 'You have no friends.',
  FRIEND_REQUESTS: 'You have no friend requests.',
};

type Props = CurrentUserProps & {
  aside: boolean,
  userListType: UserListType,
  usersQuery: {
    loading: boolean,
    error: Error,
    networkStatus: number,
    refetch: () => void,
    users: Array<User>,
  },
  userId: number,
  viewType: 'card' | 'list',
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  ${props => props.grid && `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${IMG_SIZES.xlarge}px, 6fr));
    grid-gap: ${spacing(3)};
  `}
`;

const ListItem = styled.li`
  list-style-type: none;
  margin: 0 auto;
`;

const Input = styled.input`
  font-size: 15px;
  padding: ${spacing(3, 2)};
  margin-bottom: ${spacing(2)};
  outline: none;
  width: 100%;
  box-sizing: border-box;
`;

function UserList({ aside, currentUser, searchable, userListType, usersQuery, userId, viewType }: Props) {
  const [filteredUsers, inputProps] = useInputFilter(usersQuery.users);
  React.useEffect(() => {
    if (usersQuery.users) usersQuery.refetch();
  }, [])
  const EntityComponent = viewType === 'card' ? EntityCard : EntityCell;

  const { loading, error } = usersQuery;
  return (
    <Container>
      {searchable && <Input type="text" placeholder="Find a friend..." {...inputProps} />}
      <DerivedStateSplash error={error} loading={loading}>
        {filteredUsers.length === 0 ? (
          <Splash
            small={aside}
            heading={inputProps.value.length > 0 ? 'No friends found.' : USER_LIST_EMPTY_MESSAGES[userListType]}
            visualName="meh-lightbulb"
            visualType="illustration"
          />
        ) : (
          <List grid={viewType === 'card'}>
            {filteredUsers.map((user: User): React.Node => (
              <ListItem key={user.id}>
                <EntityComponent
                  linkable
                  inList
                  entity={user}
                  isMe={currentUser.id !== user.id}
                  renderMeta={() => userListType === 'FRIEND_REQUESTS' && <FriendshipDualAction user={user} />}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DerivedStateSplash>
    </Container>
  );
}
UserList.displayName = 'UserList';
UserList.defaultProps = {
  aside: false,
  searchable: false,
  viewType: 'list',
};

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
