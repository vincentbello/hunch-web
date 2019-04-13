import gql from 'graphql-tag';
import friendshipFragment from 'graphql/fragments/friendship';

export default gql`
  ${friendshipFragment}

  query GetUserFriendship($userId: Int!) {
    userFriendship(userId: $userId) {
      ...friendshipFields
    }
  }
`;
