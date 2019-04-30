// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import { distanceInWordsToNow, format } from 'date-fns';
import pluralize from 'pluralize';
import { compose, graphql, Query } from 'react-apollo';
import { STEP_SEQUENCE } from 'constants/create-hunch';
import GET_FRIENDSHIP from 'graphql/queries/getUserFriendship';
import GET_STATS from 'graphql/queries/getUserStats';
import GET_USER from 'graphql/queries/getUser';
import UPDATE_FRIENDSHIP_STATUS from 'graphql/mutations/updateFriendshipStatus';

import { type Error } from 'types/apollo';
import { type RouterProps } from 'types/router';
import { type FriendshipStatus, type User, type UserFriendship } from 'types/user';

import HunchCreationContext, { setBettee } from 'contexts/HunchCreationContext';

import { FiBell, FiEdit2, FiUsers } from 'react-icons/fi';
import Button from 'components/Button';
import DarkLink from 'components/DarkLink';
import DerivedStateSplash from 'components/DerivedStateSplash';
import FriendshipDualAction from 'components/FriendshipDualAction';
import FavoritesList from 'components/FavoritesList';
import FriendshipButton from 'components/FriendshipButton';
import Image from 'components/Image';
import LogoutButton from 'components/LogoutButton';
import SectionHeader from 'components/SectionHeader';
import UserStats from 'components/UserStats';

import styled from '@emotion/styled';
import common from 'theme/common';
import colors from 'theme/colors';
import { media, spacing } from 'theme/sizes';
import typography from 'theme/typography';

type Props = RouterProps & {
  display: boolean,
  isCurrent: boolean,
  small: boolean,
  user: User,
  userFriendshipQuery: {
    loading: boolean,
    error: Error,
    userFriendship: UserFriendship,
  },
  updateFriendshipStatus: ({ variables: { userId: number, status: FriendshipStatus } }) => void,
};

const ActionContainer = styled.div`
  margin-top: ${spacing(2)};
  padding: ${spacing(2)};
  background-color: ${colors.white};
  border: 1px solid ${colors.borders.main};
  display: flex;
  align-items: center;

  ${media.mobile`display: block;`}
`;

const ActionLabel = styled.div`
  ${typography.base}
  font-weight: 500;
  display: flex;
  align-items: center;
  flex: 1 0 0;
  font-size: 16px;

  ${media.mobile`font-size: 14px; margin-bottom: ${spacing(3)};`}
`;

const StyledFiBell = styled(FiBell)`
  font-size: 20px;
  margin-right: ${spacing(2)};
  color: ${colors.text.primary};

  ${media.mobile`font-size: 16px;`}
`;

const StyledDarkLink = styled(DarkLink)`
  ${typography.h2}
  display: inline-block;
  margin: 0 0 2px;
  font-weight: bold;
`;

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

function UserCard({ display, history, isCurrent, small, user, userFriendshipQuery, updateFriendshipStatus }: Props): React.Node {
  const [_, dispatch] = React.useContext(HunchCreationContext); // eslint-disable-line no-unused-vars
  const [editMode, setEditMode] = React.useState(false);
  const needsAction = (
    !isCurrent &&
    userFriendshipQuery &&
    userFriendshipQuery.userFriendship &&
    userFriendshipQuery.userFriendship.status === 'PENDING' &&
    userFriendshipQuery.userFriendship.userId === user.id
  );
  const challenge = () => {
    dispatch(setBettee(user));
    history.push(`/hunch/new/${STEP_SEQUENCE[1].key}`);
  };

  return (
    <>
      {!display && needsAction && (
        <ActionContainer>
          <ActionLabel>
            <StyledFiBell />
            <div>{`${user.firstName} sent you a friend request.`}</div>
          </ActionLabel>
          <FriendshipDualAction user={user} />
        </ActionContainer>
      )}

      <Container>
        <Section>
          <Image bordered rounded size={small ? 'medium' : 'large'} src={user.imageUrl} />
          <Header>
            {display ? <StyledDarkLink to={`/user/${user.id}`}>{user.fullName}</StyledDarkLink> : <HeaderTitle>{user.fullName}</HeaderTitle>}
            <HeaderMeta>{`Member since ${format(user.createdAt, 'MMMM D, YYYY')}`}</HeaderMeta>
            <HeaderMeta>{`Last seen ${distanceInWordsToNow(user.lastLoginAt, { addSuffix: true })}`}</HeaderMeta>
          </Header>
        </Section>

        {!isCurrent && !display && (
          <>
            <Section centered clear>
              <DerivedStateSplash loading={userFriendshipQuery.loading} error={userFriendshipQuery.error} size="small">
                <FriendshipButton
                  friendship={userFriendshipQuery.userFriendship}
                  user={user}
                  updateFriendshipStatus={(status: FriendshipStatus) => updateFriendshipStatus({ variables: { userId: user.id, status } })}
                />
              </DerivedStateSplash>
              <LeftOffsetButton
                asLink
                disabled={user.friendCount === 0}
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
                  onClick={challenge}
                  buttonTitle={`Challenge ${user.firstName} to a Hunch`}
                />
              </Section>
            )}
          </>
        )}

        <ListHeader>
          <SectionHeader grow>{`${isCurrent ? 'My ' : ''}Favorite Teams`}</SectionHeader>
          {isCurrent && !display && (
            <Button
              type="tertiary"
              buttonTitle={editMode ? 'Done' : ''}
              icon={editMode ? null : <FiEdit2 />}
              title={editMode ? 'Done' : 'Edit'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </ListHeader>
        <Section clear trimmed>
          <FavoritesList editMode={editMode} mine={isCurrent} small={small} userId={isCurrent ? null : user.id} />
        </Section>

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
        {isCurrent && !display && <LogoutButton />}
      </Container>
    </>
  );
}
UserCard.displayName = 'UserCard';
UserCard.defaultProps = {
  display: false,
  isCurrent: false,
  small: false,
};

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
  withRouter,
)(UserCard);
