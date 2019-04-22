// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import GET_UPCOMING_GAMES from 'graphql/queries/getUpcomingGames';

import { FiRotateCw } from 'react-icons/fi';
import Button from 'components/Button';
import DivButton from 'components/DivButton';
import GameCell from 'components/GameCell';
import DerivedStateSplash from 'components/DerivedStateSplash';
import SectionHeader from 'components/SectionHeader';
import Splash from 'components/Splash';

import { type Game } from 'types/game';

import styled from '@emotion/styled';
import common from 'theme/common';
import { spacing } from 'theme/sizes';

type Props = {
  canCreateHunch: boolean,
  date: string | null,
  next: number | null,
  gamesQuery: {
    loading: boolean,
    error: Error,
    networkStatus: number,
    refetch: () => void,
    upcomingGames: Game[],
  },
  withHeader: boolean,
  selectGame: (game: Game) => void,
};

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  list-style-type: none;
  margin-bottom: ${spacing(2)};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const StyledDivButton = styled(DivButton)(common.shadow);
const Header = styled.header`display: flex;`;

function GameList({ canCreateHunch, gamesQuery, withHeader, selectGame }: Props) {
  return (
    <>
      {withHeader && (
        <Header>
          <SectionHeader grow>Upcoming Games</SectionHeader>
          <Button onClick={() => gamesQuery.refetch()} type="tertiary" icon={<FiRotateCw />} />
        </Header>
      )}
      <DerivedStateSplash error={gamesQuery.error} loading={gamesQuery.loading}>
        {Boolean(gamesQuery.upcomingGames) && (
          gamesQuery.upcomingGames.length === 0 ? (
            <Splash heading="No games." visualName="meh-lightbulb" visualType="illustration" />
          ) : (
            <List>
              {gamesQuery.upcomingGames.map((game: Game): React.Node => (
                <ListItem key={game.id}>
                  <StyledDivButton onClick={() => selectGame(game)}>
                    <GameCell canCreateHunch={canCreateHunch} game={game} withContainer />
                  </StyledDivButton>
                </ListItem>
              ))}
            </List>
          )
        )}
      </DerivedStateSplash>
    </>
  );
}
GameList.displayName = 'GameList';
GameList.defaultProps = {
  canCreateHunch: false,
  date: null,
  next: null,
  withHeader: false,
  selectGame() {},
};

export default graphql(GET_UPCOMING_GAMES, {
  name: 'gamesQuery',
  options: ({ date, next }) => ({ variables: { date, league: 'NBA', next } }),
})(GameList);
