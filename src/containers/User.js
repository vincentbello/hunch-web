// @flow
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import GET_USER from 'graphql/queries/getUser';

import { type Error } from 'types/apollo';
import { type User } from 'types/user';

import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';
import DerivedStateSplash from 'components/DerivedStateSplash';
import UserCard from 'components/UserCard';

type Props = CurrentUserProps & {
  userId: number,
  userQuery: {
    loading: boolean,
    error: Error,
    user: User,
  },
};

function UserContainer({ currentUser, userQuery: { loading, error, user } }: Props): React.Node {
  return (
    <DerivedStateSplash error={error} loading={loading}>
      {Boolean(user) && <UserCard isCurrent={user.id === currentUser.id} user={user} />}
    </DerivedStateSplash>
  );
}

UserContainer.displayName = 'UserContainer';
export default compose(
  graphql(GET_USER, {
    name: 'userQuery',
    options: ({ match }) => ({
      variables: {
        id: match.params.id ? parseInt(match.params.id, 10) : null,
      },
    }),
  }),
  withCurrentUser
)(UserContainer);
