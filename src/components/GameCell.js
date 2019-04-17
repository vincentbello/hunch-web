// @flow
import * as React from 'react';
import { format } from 'date-fns';

import { type Game } from 'types/game';
import { type Team } from 'types/team';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import typography from 'theme/typography';
import { spacing } from 'theme/sizes';

import { FaCaretLeft } from 'react-icons/fa';
import Image from 'components/Image';

type Props = {
  game: Game,
  large: boolean,
  light: boolean,
  muted: boolean,
  withContainer: boolean,
};

type TeamRowProps = {
  didLose: boolean,
  didWin: boolean,
  large: boolean,
  light: boolean,
  score: number | null,
  team: Team,
};

const defaultProps = {
  large: false,
  light: false,
  muted: false,
};

const MetaContainer = styled.div`
  ${props => !props.large && `flex: 3 0 0;`}
  display: flex;
  flex-direction: column;
  margin: ${spacing(2, 0)};
  align-items: center;
  justify-content: center;
  ${props => !props.large && `border: 1px solid ${colors.borders.main};`}
`;

const MetaText = styled.span`
  ${typography.base}
  color: ${props => colors.text[props.light ? 'tertiary' : 'secondary']};
  ${props => props.emphasized && `font-weight: 600;`}
  ${props => props.spaced && `margin: ${spacing(1, 0)};`}
`;

const Container = styled.div`
  display: flex;
  ${props => props.contained && `
    height: 68px;
    background-color: ${colors.white};
    border-radius: 2px;
    margin: ${spacing(0, 2, 2)};
    padding: ${spacing(1, 2)};
    align-items: center;
  `}
  ${props => props.muted && `opacity: 0.25;`}
`;

const Content = styled.div`
  flex: 7 0 0;
  margin-right: ${spacing(2)};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  margin: ${props => props.large ? spacing(0, 0, 1) : 0};
  ${props => props.muted && `opacity: 0.65;`}
`;

const RowStack = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${spacing(2)};
`;

const colorModifiers = props => css`
  ${props.light && `color: ${colors.white};`}
  ${props.highlighted && `color: ${colors.primary.orange};`}
`;

const RowSubhead = styled.span`
  ${typography.base}
  margin-bottom: 2px;
  ${colorModifiers}
`;

const RowLabel = styled.span`
  ${typography.base}
  font-weight: bold;
  ${props => props.large && `font-size: 18px;`}
  ${colorModifiers}
`;

const RowMeta = styled.span`
  font-weight: 900;
  ${props => props.large && typography.h2}
  ${props => props.isOffset && `margin-right: ${spacing(props.large ? 4 : 3)};`}
  ${colorModifiers}
`;

const WinnerIcon = styled(FaCaretLeft, { shouldForwardProp: prop => !['light', 'large'].includes(prop) })`
  color: ${props => props.light ? colors.white : colors.text.primary};
  position: relative;
  right: ${spacing(-1)};
  font-size: ${props => props.large ? 18 : 12}px;
`;

const TeamRow = ({ didLose, didWin, large, light, score, team }: TeamRowProps): React.Node => {
  return (
    <Row large={large} muted={didLose}>
      <Image rounded light={light} size={large ? 'medium' : 'xsmall'} src={team.imageUrl} />
      <RowStack>
        {large && (
          <RowSubhead light={light} highlighted={team.isFavorite}>{team.firstName}&nbsp;</RowSubhead>
        )}
        <RowLabel light={light} large={large} highlighted={team.isFavorite}>
          {team.lastName}
        </RowLabel>
      </RowStack>
      {score !== null && <RowMeta light={light} large={large} isOffset={didLose}>{score}</RowMeta>}
      {didWin && <WinnerIcon light={light} large={large} />}
    </Row>
  );
};

type GameStatusProps = { game: Game, light: boolean, spaced: boolean };

const GameStatus = ({ game, light, spaced }: GameStatusProps): React.Node => {
  const hasStarted = game.completed || game.inProgress;
  return (
    <>
      <MetaText light={light} emphasized={hasStarted}>
        {hasStarted ? (game.completed ? 'Final' : 'In Progress') : format(game.startDate, spaced ? 'MMM D, YYYY' : 'M/D, h:mm A')}
      </MetaText>
      {spaced && (
        <MetaText light spaced>
          {format(game.startDate, hasStarted ? 'MMM D, YYYY' : 'h:mm A')}
        </MetaText>
      )}
    </>
  );
};

export default function GameCell({ game, large, light, muted, withContainer }: Props) {
  return (
    <div>
      {large && <MetaText emphasized light spaced>{game.league}</MetaText>}
      <Container contained={withContainer} muted={muted}>
        <Content>
          <TeamRow
            didLose={game.completed && game.awayScore < game.homeScore}
            didWin={game.completed && game.awayScore > game.homeScore}
            large={large}
            light={light}
            score={game.awayScore}
            team={game.awayTeam}
          />
          <TeamRow
            didLose={game.completed && game.homeScore < game.awayScore}
            didWin={game.completed && game.homeScore > game.awayScore}
            large={large}
            light={light}
            score={game.homeScore}
            team={game.homeTeam}
          />
        </Content>
        <MetaContainer large={large}>
          <GameStatus game={game} light={light} spaced={large} />
        </MetaContainer>
      </Container>
      {large && <MetaText emphasized light spaced>{`${game.homeTeam.site} · ${game.homeTeam.city}, ${game.homeTeam.state}`}</MetaText>}
    </div>
  );
}
GameCell.defaultProps = defaultProps;
