// @flow
import * as React from 'react';
import { type UserListType } from 'types/user';

type InjectedProps = {
  userListType: UserListType,
};

export default function withUserListType<P>(userListType: UserListType): (React.ComponentType<P>) => React.ComponentType<P & InjectedProps> {
  return Component => function EnhancedComponent(props: P): React.Node {
    return <Component {...props} userListType={userListType} />;
  }
}
