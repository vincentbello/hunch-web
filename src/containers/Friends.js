// @flow
import * as React from 'react';
import { Query } from 'react-apollo';
import GET_USER from 'graphql/queries/getUser';
import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';
import withUserListType from 'hocs/withUserListType';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { FiPlus } from 'react-icons/fi';
import Button from 'components/Button';
import FriendSelect from 'components/FriendSelect';
import UserList from 'containers/UserList';
import SectionHeader from 'components/SectionHeader';
import type { RouterProps } from 'types/router';

import styled from '@emotion/styled';
import { media, spacing } from 'theme/sizes';

const FriendsList = withUserListType('FRIENDS')(UserList);
const FriendRequests = withUserListType('FRIEND_REQUESTS')(UserList);

const Container = styled.div`
  margin: ${spacing(3, 0, 2, 2)};
  display: flex;

  ${media.mobile(`flex-direction: column;`)}
`;

const Header = styled.header`
  display: flex;
  align-items: center;
`;

const Main = styled.div`
  flex: 2 0 0;
  margin-right: ${spacing(4)};
  ${media.mobile`order: 2;`}
`;

const Aside = styled.aside`
  flex: 1 0 0;
  ${media.mobile`order: 1;`}
`;

const InputContainer = styled.div`
  margin-bottom: ${spacing(2)};
`;

type Props = RouterProps & CurrentUserProps & {};

function Friends(props: Props) {
  useDocumentTitle('Friends');
  const [adding, setAdding] = React.useState(false);
  return (
    <Container>
      <Main>
        <SectionHeader>
          {!props.match.params.id || props.match.params.id === `${props.currentUser.id}` ? (
            'My '
          ) : (
            <Query query={GET_USER} variables={{ id: parseInt(props.match.params.id, 10) }}>
              {({ data: { user } }) => Boolean(user) && `${user.fullName}'s `}
            </Query>
          )}
          Friends
        </SectionHeader>
        <FriendsList {...props} viewType="card" searchable />
      </Main>
      {!props.match.params.id && (
        <Aside>
          <Header>
            <SectionHeader grow>Friend Requests</SectionHeader>
            {!adding && <Button size="large" type="tertiary" icon={<FiPlus />} onClick={() => setAdding(true)} />}
          </Header>
          {adding && <InputContainer><FriendSelect allUsers autoFocus contained linkable /></InputContainer>}
          <FriendRequests {...props} aside />
        </Aside>
      )}
    </Container>
  );
}

export default withCurrentUser(Friends);
