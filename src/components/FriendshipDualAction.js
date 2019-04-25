// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import { toast } from 'react-toastify';
import type { User } from 'types/user';
import GET_FRIENDSHIP from 'graphql/queries/getUserFriendship';
import GET_USER from 'graphql/queries/getUser';
import GET_USERS from 'graphql/queries/getUsers';
import UPDATE_FRIENDSHIP_STATUS from 'graphql/mutations/updateFriendshipStatus';
import DarkLink from 'components/DarkLink';
import DualAction from 'components/DualAction';

type Props = {
  user: User,
  updateFriendshipStatus: () => void,
};

const updateHandler = (userId: number): (() => void) => (cache, { data: { updateFriendshipStatus: newFriendship } }) => {
  const friendsQuery = { query: GET_USERS, variables: { userListType: 'FRIEND_REQUESTS', userId: null } };
  try {
    const { users } = cache.readQuery(friendsQuery);
    cache.writeQuery({ ...friendsQuery, data: { users: users.filter(user => user.id !== userId) } });
  } catch(e) {}

  const friendshipQuery = { query: GET_FRIENDSHIP, variables: { userId } };
  try {
    cache.readQuery(friendshipQuery);
  } catch(e) {
    cache.writeQuery({ ...friendshipQuery, data: { userFriendship: newFriendship } })
  }
  if (newFriendship.status === 'ACTIVE') {
    const userQuery = { query: GET_USER, variables: { id: userId } };
    try {
      const { user } = cache.readQuery(userQuery);
      const increment = newFriendship.status === 'ACTIVE' ? 1 : -1;
      if (user !== null) cache.writeQuery({ ...userQuery, data: { user: { ...user, friendCount: user.friendCount + increment } } });
    } catch(e) {}
  }
};

const toastHandler = (user: User) => ({ updateFriendshipStatus }) => {
  const successMessage = updateFriendshipStatus.status === 'ACTIVE'
    ? <>You and <DarkLink to={`/user/${user.id}`}>{user.firstName}</DarkLink> are now friends!</>
    : <>You have rejected <DarkLink to={`/user/${user.id}`}>{user.fullName}</DarkLink>'s friend request.</>;
  toast.success(successMessage);
};

function FriendshipDualAction({ user, updateFriendshipStatus }: Props) {
  const updaterFn = (status: FriendshipStatus) => (evt) => {
    evt.preventDefault();
    updateFriendshipStatus({ variables: { userId: user.id, status } });
  };
  return (
    <DualAction
      canPerformPrimaryAction
      canPerformSecondaryAction
      primaryAction={updaterFn('ACTIVE')}
      primaryLabel="Accept"
      secondaryAction={updaterFn('REJECTED')}
      secondaryLabel="Reject"
    />
  );
}

export default graphql(UPDATE_FRIENDSHIP_STATUS, {
  name: 'updateFriendshipStatus',
  options: ({ user }) => ({
    update: updateHandler(user.id),
    onCompleted: toastHandler(user),
    refetchQueries: [{ query: GET_USERS, variables: { userListType: 'FRIENDS', userId: null } }],
  }),
})(FriendshipDualAction);
