// @flow
import * as React from 'react';
import { compose, graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import GET_HUNCH from 'graphql/queries/getHunch';
import GET_GAME from 'graphql/queries/getGame';
import { noop } from 'utils/functions';

import { type Error } from 'types/apollo';
import { type Hunch } from 'types/hunch';
import type { RouterProps } from 'types/router';
// import { type Game } from 'types/game';
// import { type Message } from 'types/message';
// import { type User } from 'types/user';

import styled from '@emotion/styled';
import colors from 'theme/colors';
import typography from 'theme/typography';
import { spacing } from 'theme/sizes';

// import Icon from 'react-native-vector-icons/FontAwesome';

import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';
import DerivedStateSplash from 'components/DerivedStateSplash';
// import HunchActions from 'components/HunchActions';
// import GameCell from 'components/GameCell';
import Amount from 'components/Amount';
import Messages from 'components/Messages';
import ImageSplash from 'components/ImageSplash';
// import FeedMessage from 'components/FeedMessage';
// import PaymentActions from 'components/PaymentActions';
import User from 'components/User';

type ExternalProps = {
  hunchId: number,
  hunchQuery: {
    loading: boolean,
    error: Error,
    hunch: Hunch,
  },
};

type Props = ExternalProps & RouterProps & CurrentUserProps;

const Content = styled.div`
  z-index: 1;
  position: relative;
  top: ${spacing(-2)};
  margin-bottom: ${spacing(-2)};
`;

const Section = styled.section`
  display: ${props => props.flexed ? 'flex' : 'block'};
  position: relative;
  background-color: ${colors.white};
  border-radius: 2px;
  margin: ${spacing(0, 2, 2)};
  padding: ${spacing(2)};
`;

const SectionHeader = styled.h4`
  ${typography.h4}
  margin: ${spacing(0, 0, 2)};
  font-weight: 900;
`;

function HunchContainer({ currentUser, hunchQuery: { loading, error, hunch } }: Props): React.Node {

  // renderActions = (hunch: Hunch): React.Node => {
  //   if (hunch.active || ![hunch.bettor.id, hunch.bettee.id].includes(this.props.currentUser.id)) return null;

  //   const isBettor = hunch.bettor.id === this.props.currentUser.id;
  //   const other = isBettor ? hunch.bettee : hunch.bettor;
  //   const didWin = hunch.winnerId === this.props.currentUser.id;
  //   const didLose = hunch.winnerId !== null && hunch.winnerId !== this.props.currentUser.id;
  //   return (
  //     <View style={[styles.section, styles.section_centered]}>
  //       <Text style={styles.splashText}>
  //         {hunch.winnerId !== null ?
  //           (didWin ? '🎉 You won!' : '😤 You lost...') :
  //           (isBettor ? `You challenged ${other.firstName}.` : `${other.firstName} challenged you.`)
  //         }
  //       </Text>
  //       {hunch.responded ? (
  //         <React.Fragment>
  //           <Text style={[styles.splashSubhead, didLose && styles.splashSubhead_padded]}>
  //             {didWin ? `${other.firstName} owes you $${hunch.amount}.` : `You owe ${other.firstName} $${hunch.amount}.`}
  //           </Text>
  //           {didLose && <PaymentActions user={other} />}
  //         </React.Fragment>
  //       ) : (
  //         <HunchActions hunch={hunch} isBettor={isBettor} onCancel={Actions.pop} />
  //       )}
  //     </View>
  //   );
  // };

  return (
    <DerivedStateSplash error={error} loading={loading}>
      {Boolean(hunch) && (
        <Query query={GET_GAME} variables={{ id: hunch.game.id }}>
          {({ loading, error, data: { game } }): React.Node => (
            <React.Fragment>
              <ImageSplash dimmed src="/assets/nba-splash.png">
                <DerivedStateSplash error={error} loading={loading}>
                  {game && <div>GAMECELL</div>}
                  {/* <View style={styles.game}>
                    <GameCell game={game} large light />
                  </View> */}
                </DerivedStateSplash>
              </ImageSplash>
              <Content>
                <Section flexed>
                  <User currentUser={currentUser} user={hunch.bettor} hunch={hunch} game={game} isBettor />
                  <Amount amount={hunch.amount} />
                  <User currentUser={currentUser} user={hunch.bettee} hunch={hunch} game={game} />
                </Section>
                {/* {this.renderActions(hunch)} */}
                {Boolean(hunch.wager) && (
                  <Section>
                    <SectionHeader>Trash Talk</SectionHeader>
                    <Messages
                      currentUser={currentUser}
                      messages={[{ id: 1, author: hunch.bettee, content: 'hunch.wager hello world hello world world hello world world hello world world hello world world hello world world hello world' }, { id: 2, author: hunch.bettor, content: 'Fuck you' }]}
                    />
                  </Section>
                )}
              </Content>
            </React.Fragment>
          )}
        </Query>
      )}
    </DerivedStateSplash>
  );
}

HunchContainer.displayName = 'HunchContainer';

export default compose(
  graphql(GET_HUNCH, { name: 'hunchQuery', options: ({ match }) => ({ variables: { hunchId: parseInt(match.params.id, 10) } }) }),
  withCurrentUser,
)(HunchContainer);

