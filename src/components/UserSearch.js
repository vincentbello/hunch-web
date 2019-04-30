// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import GET_USERS from 'graphql/queries/getUsers';
import { type Error } from 'types/apollo';
import type { User } from 'types/user';

import DerivedStateSplash from 'components/DerivedStateSplash';

import styled from '@emotion/styled';
import common from 'theme/common';

const UserList = styled.ul(common.reset.list);
const UserItem = styled.li(common.reset.item);

type Props = {
  input: string,
  usersQuery: {
    loading: boolean,
    error: Error,
    users: User[],
  },
  renderUser: (user: User) => React.Node,
};

function UserSearch({ input, usersQuery, renderUser }: Props) {
  if (input.length === 0) return null;
  return (
    <DerivedStateSplash loading={usersQuery.loading} error={usersQuery.error}>
      {!usersQuery.users || usersQuery.users.length === 0 ? (
        'No users found.'
      ) : (
        <UserList>
          {usersQuery.users.map((user: User) => <UserItem key={user.id}>{renderUser(user)}</UserItem>)}
        </UserList>
      )}
    </DerivedStateSplash>
  );
}
UserSearch.defaultProps = {
  contained: false,
  large: false,
  renderUser: () => null,
};

export default graphql(GET_USERS, {
  name: 'usersQuery',
  options: ({ input: filterInput }: Props) => ({
    variables: {
      userListType: 'ALL_USERS',
      filterInput,
    },
  }),
})(UserSearch);
