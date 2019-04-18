// @flow
import * as React from 'react';
import { distanceInWordsToNow, format } from 'date-fns';
import pluralize from 'pluralize';
import { compose, graphql, Query } from 'react-apollo';
import GET_FRIENDSHIP from 'graphql/queries/getUserFriendship';
import GET_STATS from 'graphql/queries/getUserStats';
import GET_USER from 'graphql/queries/getUser';
import UPDATE_FRIENDSHIP_STATUS from 'graphql/mutations/updateFriendshipStatus';

import { type Error } from 'types/apollo';
import { type FriendshipStatus, type User, type UserFriendship } from 'types/user';

import { FiBell, FiEdit2, FiUsers } from 'react-icons/fi';
import Button from 'components/Button';
import DerivedStateSplash from 'components/DerivedStateSplash';
import DualAction from 'components/DualAction';
import FavoritesList from 'components/FavoritesList';
import FriendshipButton from 'components/FriendshipButton';
import Image from 'components/Image';
import SectionHeader from 'components/SectionHeader';
import UserStats from 'components/UserStats';

import styled from '@emotion/styled';
import common from 'theme/common';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';

const ActionContainer = styled.div`
  padding: ${spacing(2)};
  background-color: ${colors.white};
  border: 1px solid ${colors.borders.main};
`;

const ActionLabel = styled.div`
  ${typography.base}
  font-weight: 500;
  margin-bottom: ${spacing(3)};
  display: flex;
  align-items: center;
`;

const StyledFiBell = styled(FiBell)`
  font-size: 16px;
  margin-right: ${spacing(2)};
  color: ${colors.text.primary};
`;

type Props = {
  isCurrent: boolean,
  user: User,
  userFriendshipQuery: {
    loading: boolean,
    error: Error,
    userFriendship: UserFriendship,
  },
  updateFriendshipStatus: ({ variables: { userId: number, status: FriendshipStatus } }) => void,
};

const Container = styled.main`margin-top: ${spacing(2)};`;

const Section = styled.section`
  ${props => !props.clear && common.box}
  margin: ${spacing(0, 2, 2)};
  padding: ${props => spacing(props.trimmed ? 0 : 2)};
  display: flex;
  align-items: center;
  ${props => props.centered ? 'justify-content: center;' : ''}
`;

const Header = styled.header`margin-left: ${spacing(2)}`;

const HeaderTitle = styled.h2`
  ${typography.h2}
  margin: ${spacing(0, 0, 1)};
  font-weight: bold;
`;

const HeaderMeta = styled.div`
  ${typography.h5}
  color: ${colors.text.secondary};
  margin-bottom: 2px;
`;

const ListHeader = styled.section`
  display: flex;
  align-items: center;
  margin: ${spacing(0, 2, 0)};
`;

const LeftOffsetButton = styled(Button)`margin-left: ${spacing(2)};`;
const FavoritesSection = styled.section`margin-bottom: ${spacing(3)};`;

const updateHandler = (userId: number, oldFriendship: UserFriendship): (() => void) => (cache, { data: { updateFriendshipStatus: newFriendship } }) => {
  const friendshipQuery = { query: GET_FRIENDSHIP, variables: { userId } };
  const { userFriendship } = cache.readQuery(friendshipQuery);
  if (userFriendship === null) cache.writeQuery({ ...friendshipQuery, data: { userFriendship: newFriendship } });
  if (newFriendship.status === 'ACTIVE' || (oldFriendship.status === 'ACTIVE' && newFriendship.status === 'DELETED')) {
    const userQuery = { query: GET_USER, variables: { id: userId } };
    const { user } = cache.readQuery(userQuery);
    const increment = newFriendship.status === 'ACTIVE' ? 1 : -1;
    if (user !== null) cache.writeQuery({ ...userQuery, data: { user: { ...user, friendCount: user.friendCount + increment } } });
  }
};

function UserCard({ isCurrent, user, userFriendshipQuery, updateFriendshipStatus }: Props): React.Node {
  const needsAction = (
    !isCurrent &&
    userFriendshipQuery &&
    userFriendshipQuery.userFriendship &&
    userFriendshipQuery.userFriendship.status === 'PENDING' &&
    userFriendshipQuery.userFriendship.userId === user.id
  );
  const updateFriendship = (status: FriendshipStatus): void => updateFriendshipStatus({ variables: { userId: user.id, status } });

  return (
    <>
      {needsAction && (
        <ActionContainer>
          <ActionLabel>
            <StyledFiBell />
            <div>{`${user.firstName} sent you a friend request.`}</div>
          </ActionLabel>
          <DualAction
            canPerformPrimaryAction
            canPerformSecondaryAction
            primaryAction={(): void => updateFriendship('ACTIVE')}
            primaryLabel="Accept"
            secondaryAction={(): void => updateFriendship('REJECTED')}
            secondaryLabel="Reject"
          />
        </ActionContainer>
      )}

      <Container>
        <Section>
          <Image bordered rounded size="large" src={user.imageUrl} />
          <Header>
            <HeaderTitle>{user.fullName}</HeaderTitle>
            <HeaderMeta>{`Member since ${format(user.createdAt, 'MMMM D, YYYY')}`}</HeaderMeta>
            <HeaderMeta>{`Last seen ${distanceInWordsToNow(user.lastLoginAt, { addSuffix: true })}`}</HeaderMeta>
          </Header>
        </Section>

        {!isCurrent && (
          <>
            <Section centered clear>
              <DerivedStateSplash loading={userFriendshipQuery.loading} error={userFriendshipQuery.error} size="small">
                <FriendshipButton
                  friendship={userFriendshipQuery.userFriendship}
                  user={user}
                  updateFriendshipStatus={updateFriendship}
                />
              </DerivedStateSplash>
              <LeftOffsetButton
                asLink
                to={`/user/${user.id}/friends`}
                leftIcon={<FiUsers />}
                buttonTitle={pluralize('friend', user.friendCount, true)}
                type="secondary"
              />
            </Section>
            {userFriendshipQuery.userFriendship && userFriendshipQuery.userFriendship.status === 'ACTIVE' && (
              <Section clear trimmed>
                <Button
                  block
                  size="large"
                  type="primary"
                  onClick={(): void => console.log('challenge', user.id)}
                  buttonTitle={`Challenge ${user.firstName} to a Hunch`}
                />
              </Section>
            )}
          </>
        )}

        <ListHeader>
          <SectionHeader grow>{`${isCurrent ? 'My ' : ''}Favorite Teams`}</SectionHeader>
          {isCurrent && <Button type="tertiary" icon={<FiEdit2 />} title="Edit" onClick={() => console.log('edit my favorites')} />}
        </ListHeader>
        <FavoritesSection>
          <FavoritesList editMode mine={isCurrent} userId={isCurrent ? null : user.id} />
        </FavoritesSection>

        <Query query={GET_STATS} variables={{ userId: user.id }}>
          {({ loading, error, data }): React.Node => (
            <>
              <SectionHeader padded>Statistics</SectionHeader>
              <Section>
                <DerivedStateSplash loading={loading} error={error}>
                  {Boolean(data) && Boolean(data.userStats) && <UserStats stats={data.userStats.overall} />}
                </DerivedStateSplash>
              </Section>
              {!isCurrent && (
                <>
                  <SectionHeader padded>Against Me</SectionHeader>
                  <Section>
                    <DerivedStateSplash loading={loading} error={error}>
                      {Boolean(data) && Boolean(data.userStats) && <UserStats stats={data.userStats.against} />}
                    </DerivedStateSplash>
                  </Section>
                </>
              )}
            </>
          )}
        </Query>
      </Container>
    </>
  );
}
UserCard.displayName = 'UserCard';

export default compose(
  graphql(GET_FRIENDSHIP, {
    name: 'userFriendshipQuery',
    options: ({ user }) => ({ variables: { userId: user.id } }),
    skip: ({ isCurrent }) => isCurrent,
  }),
  graphql(UPDATE_FRIENDSHIP_STATUS, {
    name: 'updateFriendshipStatus',
    options: ({ user, userFriendshipQuery }) => ({
      update: updateHandler(user.id, userFriendshipQuery && userFriendshipQuery.userFriendship),
    }),
  }),
)(UserCard);
