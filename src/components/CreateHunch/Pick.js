// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import GET_GAME from 'graphql/queries/getGame';

import HunchCreationContext, { setBettorPickTeam } from 'contexts/HunchCreationContext';
import { STEPS, type StepProps, stepDefaultProps } from 'constants/create-hunch';

import TeamPicker from 'components/TeamPicker';
import { Container, Content, Heading } from 'components/CreateHunch/Layout';

export default function Pick({ goToNext }: StepProps) {
  const [creationState, dispatch] = React.useContext(HunchCreationContext);
  if (creationState.gameId === null) return <Redirect to={`/hunch/new/${STEPS.GAME.key}`} />;
  return (
    <Container>
      <Heading snug>What's your pick?</Heading>
      <Content full padded>
        <Query query={GET_GAME} variables={{ id: creationState.gameId }}>
          {({ data: { game } }): React.Node => !!game && (
            <TeamPicker
              game={game}
              pickedTeamId={creationState.bettorPickTeamId}
              selectTeam={(id: number | null) => {
                dispatch(setBettorPickTeam(id));
                if (id !== null) goToNext();
              }}
            />
          )}
        </Query>
      </Content>
    </Container>
  );
}
Pick.defaultProps = stepDefaultProps;
