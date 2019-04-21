// @flow
import * as React from 'react';
import withUserListType from 'hocs/withUserListType';
import useDocumentTitle from 'hooks/useDocumentTitle';
import UserList from 'containers/UserList';

const FriendsList = withUserListType('FRIENDS')(UserList);

export default function Friends(props) {
  useDocumentTitle('Friends');
  return <FriendsList {...props} />;
}
