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

import { FiEdit2, FiUsers } from 'react-icons/fi';
import Button from 'components/Button';
import DerivedStateSplash from 'components/DerivedStateSplash';
// import DualAction from 'components/DualAction';
// import FavoritesList from 'components/FavoritesList';
import FriendshipButton from 'components/FriendshipButton';
import Image from 'components/Image';
import SectionHeader from 'components/SectionHeader';
// import UserStats from 'components/UserStats';

import styled from '@emotion/styled';
import common from 'theme/common';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';
// import { BoxStyles } from 'theme/app';
import typography from 'theme/typography';

// const styles = StyleSheet.create({
//   action: {
//     padding: 8,
//     backgroundColor: Colors.white,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.cellBorder,
//   },
//   actionLabel: {
//     marginBottom: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionLabelText: {
//     color: Colors.textPrimary,
//     marginLeft: 8,
//   },
//   actionButton: {
//     marginLeft: 8,
//     marginRight: 8,
//     marginBottom: 12,
//     backgroundColor: Colors.brand.primary,
//     padding: 12,
//     borderRadius: 4,
//   },
//   actionButtonText: {
//     color: Colors.white,
//     fontWeight: 'bold',
//   },
//   section: {
//     ...BoxStyles,
//     marginLeft: 8,
//     marginRight: 8,
//     marginBottom: 8,
//     padding: 8,
//   },
//   section_row: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   section_clear: {
//     marginTop: 4,
//     marginBottom: 12,
//   },
//   sectionHeader: {
//     ...Typography.h4,
//     fontWeight: '900',
//     marginBottom: 2,
//     marginLeft: 8,
//     marginRight: 8,
//   },
//   headerContent: {
//     marginLeft: 8,
//     flex: 1,
//   },
//   headerTitle: {
//     ...Typography.h2,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   headerMeta: {
//     ...Typography.h5,
//     color: Colors.textSecondary,
//     marginBottom: 2,
//   },
//   button: {
//     paddingTop: 6,
//     paddingBottom: 6,
//     paddingLeft: 8,
//     paddingRight: 8,
//     marginLeft: 12,
//     backgroundColor: Colors.white,
//     borderColor: Colors.brand.primary,
//     borderWidth: 1,
//     borderRadius: 3,
//   },
//   buttonIcon: {
//     marginRight: 8,
//   },
//   buttonLabel: {
//     fontWeight: 'bold',
//     color: Colors.brand.primary,
//   },
//   favorites: {
//     marginBottom: 12,
//   },
//   listHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   listHeaderText: {
//     flex: 1,
//     marginRight: 8,
//   },
//   listEditButton: {
//     padding: 0,
//     paddingTop: 4,
//     paddingBottom: 4,
//     paddingLeft: 6,
//     paddingRight: 6,
//   },
//   listEditIcon: {
//     marginRight: 0,
//   },
// });

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
  margin: ${spacing(0, 2, 2)};
`;

const LeftOffsetButton = styled(Button)`margin-left: ${spacing(2)};`;

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

  // get needsAction(): boolean {
  //   const { isCurrent, user, userFriendshipQuery: q } = this.props;
  //   return !isCurrent && q && q.userFriendship && q.userFriendship.status === 'PENDING' && q.userFriendship.userId === user.id;
  // }

  // updateFriendshipStatus = (status: FriendshipStatus): void => this.props.updateFriendshipStatus({ variables: { userId: this.props.user.id, status } });

  // const { isCurrent, user, userFriendshipQuery } = this.props;
  // const { needsAction } = this;
  return (
    <React.Fragment>
      {/* {needsAction && (
        <View style={styles.action}>
          <View style={styles.actionLabel}>
            <Icon name="bell" size={16} color={Colors.textPrimary} />
            <Text style={styles.actionLabelText}>{`${user.firstName} sent you a friend request.`}</Text>
          </View>
          <DualAction
            canPerformPrimaryAction
            canPerformSecondaryAction
            primaryAction={(): void => this.updateFriendshipStatus('ACTIVE')}
            primaryLabel="Accept"
            secondaryAction={(): void => this.updateFriendshipStatus('REJECTED')}
            secondaryLabel="Reject"
          />
        </View>
      )} */}

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
          <React.Fragment>
            <Section centered clear>
              <DerivedStateSplash loading={userFriendshipQuery.loading} error={userFriendshipQuery.error} size="small">
                <FriendshipButton
                  friendship={userFriendshipQuery.userFriendship}
                  name={user.firstName}
                  userId={user.id}
                  updateFriendshipStatus={updateFriendshipStatus}
                />
              </DerivedStateSplash>
              <LeftOffsetButton
                onClick={(): void => console.log('go to friends for', user.id)}
                leftIcon={<FiUsers />}
                title={pluralize('friend', user.friendCount, true)}
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
                  title={`Challenge ${user.firstName} to a Hunch`}
                />
              </Section>
            )}
          </React.Fragment>
        )}

       <ListHeader>
          <SectionHeader grow>{`${isCurrent ? 'My ' : ''}Favorite Teams`}</SectionHeader>
          {isCurrent && <Button type="tertiary" icon={<FiEdit2 />} onClick={() => console.log('edit my favorites')} />}
        </ListHeader>
         {/* <View style={styles.favorites}>
          <FavoritesList mine={isCurrent} userId={isCurrent ? null : user.id} />
        </View>

        <Query query={GET_STATS} variables={{ userId: user.id }}>
          {({ loading, error, data }): React.Node => (
            <React.Fragment>
              <Text style={styles.sectionHeader}>Statistics</Text>
              <View style={styles.section}>
                <DerivedStateSplash loading={loading} error={error}>
                  {Boolean(data) && Boolean(data.userStats) && <UserStats stats={data.userStats.overall} />}
                </DerivedStateSplash>
              </View>
              {!isCurrent && (
                <React.Fragment>
                  <Text style={styles.sectionHeader}>Against Me</Text>
                  <View style={styles.section}>
                    <DerivedStateSplash loading={loading} error={error}>
                      {Boolean(data) && Boolean(data.userStats) && <UserStats stats={data.userStats.against} />}
                    </DerivedStateSplash>
                  </View>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </Query> */}
      </Container>
    </React.Fragment>
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
