import gql from 'graphql-tag';
import userFragment from 'graphql/fragments/user';

export default gql`
  ${userFragment}

  query UserList($userListType: UserListType, $userId: Int, $filterInput: String) {
    users(userListType: $userListType, userId: $userId, filterInput: $filterInput) {
      ...userFields
    }
  }
`;
