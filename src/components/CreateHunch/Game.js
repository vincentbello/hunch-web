// @flow
import * as React from 'react';
import { Query } from 'react-apollo';

import GET_GAME from 'graphql/queries/getGame';

import HunchCreationContext, { setGame } from 'contexts/HunchCreationContext';
import { type StepProps, stepDefaultProps } from 'constants/create-hunch';
import { DATE_VIEW_TYPES } from 'constants/view-types';

import type { Game as GameType } from 'types/game';

import Button from 'components/Button';
import GameList from 'containers/GameList';
import GameCell from 'components/GameCell';
import TabView from 'components/TabView';
import { Container, Content, Heading } from 'components/CreateHunch/Layout';

export default function Game({ valid, goToNext }: StepProps) {
  const [creationState, dispatch] = React.useContext(HunchCreationContext);
  return (
    <Container>
      <Heading snug>What game do you have a Hunch about?</Heading>
      {valid && <Button type="tertiary" buttonTitle="Choose Another Game" onClick={() => dispatch(setGame(null))} />}
      <Content full padded>
        {valid ? (
          <Query query={GET_GAME} variables={{ id: creationState.gameId }}>
            {({ data: { game } }): React.Node => !!game && <GameCell game={game} large withContainer />}
          </Query>
        ) : (
          <TabView
            views={DATE_VIEW_TYPES}
            renderScene={(index: number) => (
              <GameList
                date={DATE_VIEW_TYPES[index].key}
                today={index === 0}
                selectGame={(game: GameType) => {
                  dispatch(setGame(game.id));
                  goToNext();
                }}
              />
            )}
          />
        )}
      </Content>
    </Container>
  );
}
Game.defaultProps = stepDefaultProps;
