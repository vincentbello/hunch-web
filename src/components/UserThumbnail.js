/* eslint jsx-a11y/accessible-emoji: 0 */
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

import DarkLink from 'components/DarkLink';
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
const Container = styled.div`
  ${props => props.muted && `opacity: 1;`}
  position: relative;
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

const UserLink = styled(DarkLink)`
  ${typography.h4}
  ${props => props.muted && `opacity: 0.75;`}
  margin: ${spacing(1, 0, 0)};
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

const Trophy = styled.span`
  animation: ${common.keyframes.pulseAndShake} 1.5s;
  font-size: 24px;
  position: relative;
  text-shadow: 1px 1px 1px rgba(255,255,255,.95);
  margin-bottom: -36px;
  top: -36px;
  ${props => css`
    right: ${props.left ? 'auto' :'28px'};
    ${props.left && `left: 28px;`}
  `}
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
    <Container muted={!isCurrentUser} left={isBettor}>
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
      {didWin && <Trophy left={!isBettor} role="img" aria-label="trophy">🏆</Trophy>}
      {pickedTeam && (
        <Subhead>{inactive ? 'Pending response' : `Picked the ${pickedTeam.lastName}`}</Subhead>
      )}
      <UserLink muted={didLose} to={`/user/${user.id}`}>{user.fullName}</UserLink>
      <div>
        <UserMetaText>Record: </UserMetaText>
        <Query query={GET_USER_STATS} variables={{ userId: user.id }}>
          {({ data: { userStats } }) => Boolean(userStats) && (
            <UserMetaText>{`${userStats.overall.won}-${userStats.overall.played - userStats.overall.won}`}</UserMetaText>
          )}
        </Query>
      </div>
      {isBettor && <UserBadge>CHALLENGER</UserBadge>}
    </Container>
  );
}
User.defaultProps = { isBettor: false };
