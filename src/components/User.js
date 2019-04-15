// @flow
import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { type Hunch } from 'types/hunch';
import { type Game } from 'types/game';
import { type User as UserType } from 'types/user';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import common from 'theme/common';
import colors from 'theme/colors';
import typography from 'theme/typography';
import { spacing } from 'theme/sizes';

import Image from 'components/Image';

type Props = { currentUser: UserType, isBettor: boolean, user: UserType, game: Game, hunch: Hunch };

const GET_USER_STATS = gql`
  query FullUserStats($userId: Int!) {
    userStats(userId: $userId) {
      overall {
        won
        played
      }
    }
  }
`;

// TODO: styled(Link) to={`user/${user.id}`}
const StyledLink = styled.a`
  ${common.reset.link}
  ${props => props.muted && `opacity: 1;`}
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  position: relative;
  margin: ${props => props.left ? spacing(0, 1, -5, 0) : spacing(0, 0, -5, 1)};
  top: ${spacing(-5)};
  z-index: 2;
`;

const TeamContainer = styled.div`
  position: relative;
  margin-bottom: ${spacing(-5)};
  top: ${spacing(-4)};
  ${props => css`
    left: ${props.left ? 'auto' : spacing(-5)};
    ${props.left && `right: ${spacing(-5)};`}
  `}
`;

const Subhead = styled.div`
  color: ${colors.text.secondary};
  font-size: 13px;
  margin-top: ${spacing(3)};
`;

const UserLabelContainer = styled.div`
  display: flex;
  align-items: 'center',
  justify-content: 'center',
  margin: ${spacing(2, 0, 1)};
`;

const UserLabel = styled.span`
  ${typography.h4}
  ${props => props.muted && `opacity: 0.75;`}
  font-weight: 800;
`;

const UserMetaText = styled.span`
  color: ${colors.text.secondary};
  font-size: 12px;
`;

const UserBadge = styled.div`
  margin-top: ${spacing(1)};
  padding: ${spacing(1)};
  border: 2px solid ${colors.brand.primary};
  border-radius: 4px;
  font-weight: 900;
  font-size: 10px;
  color: ${colors.brand.primary};
`;

export default function User({ currentUser, isBettor, game, hunch, user }: Props) {
  let pickedTeam = null;
  if (game) {
    pickedTeam = (game.homeTeam.id === hunch.bettorPickTeamId && isBettor) || (game.homeTeam.id !== hunch.bettorPickTeamId && !isBettor) ? game.homeTeam : game.awayTeam;
  }
  const didWin = hunch.winnerId === user.id;
  const didLose = hunch.winnerId !== null && hunch.winnerId !== user.id;
  const inactive = !isBettor && !hunch.responded;
  const isCurrentUser = user.id === currentUser.id;

  return (
    <StyledLink muted={!isCurrentUser} left={isBettor}>
      <Image dotted={inactive} muted={didLose} rounded padded size="large" src={user.imageUrl} />
      {pickedTeam !== null && (
        <TeamContainer left={isBettor}>
          <Image
            dotted={inactive}
            muted={didLose}
            rounded
            padded
            size="xsmall"
            src={pickedTeam.imageUrl}
          />
        </TeamContainer>
      )}
      {pickedTeam && (
        <Subhead>{inactive ? 'Pending response' : `Picked the ${pickedTeam.lastName}`}</Subhead>
      )}
      <UserLabelContainer>
        {didWin && (
          '★'
          // <Icon style={styles.userIcon} name="star" size={20} color={Colors.gold} />
        )}
        <UserLabel muted={didLose}>{user.fullName}</UserLabel>
      </UserLabelContainer>
      <div>
        <UserMetaText>Record: </UserMetaText>
        <Query query={GET_USER_STATS} variables={{ userId: user.id }}>
          {({ data: { userStats } }) => Boolean(userStats) && (
            <UserMetaText>{`${userStats.overall.won}-${userStats.overall.played - userStats.overall.won}`}</UserMetaText>
          )}
        </Query>
      </div>
      {isBettor && <UserBadge>CHALLENGER</UserBadge>}
    </StyledLink>
  );
}
User.defaultProps = { isBettor: false };
