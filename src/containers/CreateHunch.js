// @flow
import * as React from 'react';
import { Query } from 'react-apollo';
import GET_GAME from 'graphql/queries/getGame';

import HunchCreationContext, { clearForm, setAmount, setBettee, setBettorPickTeam, setGame, setWager } from 'contexts/HunchCreationContext';
import useDocumentTitle from 'hooks/useDocumentTitle';

import { DATE_VIEW_TYPES } from 'constants/view-types';
import { FiX } from 'react-icons/fi';
import GameList from 'containers/GameList';
import AmountInput from 'components/AmountInput';
import Button from 'components/Button';
import CreateHunchButton from 'components/CreateHunchButton';
import GameCell from 'components/GameCell';
import TabView from 'components/TabView';
import TeamPicker from 'components/TeamPicker';
import SectionHeader from 'components/SectionHeader';
import FriendSelect from 'components/FriendSelect';

import { type RouterProps } from 'types/router';
import { type Game } from 'types/game';
import { type User } from 'types/user';

import styled from '@emotion/styled';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

const Container = styled.div`margin: ${spacing(2, 0)};`;
const Content = styled.div`margin: ${spacing(0, 2)}`;

const Header = styled.header`
  background-color: ${colors.white};
  border: 1px solid ${colors.borders.main};
  border-width: 1px 0;
  padding: ${spacing(0, 2)};
  display: flex;
  align-items: center;
  min-height: 56px;
  box-sizing: border-box;
`;

const Section = styled.section`margin-bottom: ${spacing(4)};`;

const SectionHeaderContainer = styled.header`
  display: flex;
  align-items: center;
  margin-top: ${spacing(2)};
`;

const MetaButton = styled(Button)`
  position: relative;
  top: -4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  margin-bottom: ${spacing(2)};
  padding: ${spacing(2)};
  border: 1px solid ${colors.borders.main};
  font-size: 15px;

  &:focus {
    border-color: ${colors.borders.focus};
  }
`;

export default function CreateHunch({ history }: RouterProps) {
  useDocumentTitle('New Hunch');
  const [creationState, dispatch] = React.useContext(HunchCreationContext);
  const onCreated = () => {
    history.push('/hunches/pending');
    setTimeout(() => dispatch(clearForm()), 1000);
  };
  return (
    <Container>
      <Header>
        <FriendSelect value={creationState.bettee} selectUser={(user: User) => dispatch(setBettee(user))} />
        <AmountInput amount={creationState.amount} setAmount={(amount: number) => dispatch(setAmount(amount))} />
      </Header>
      <Content>
        <SectionHeaderContainer>
          <SectionHeader grow>{creationState.gameId === null ? 'Select a Game' : 'Selected Game'}</SectionHeader>
          {creationState.gameId !== null && <MetaButton type="tertiary" icon={<FiX />} onClick={() => dispatch(setGame(null))} />}
        </SectionHeaderContainer>
        <Section>
          {creationState.gameId === null ? (
            <TabView
              views={DATE_VIEW_TYPES}
              renderScene={(index: number) => (
                <GameList date={DATE_VIEW_TYPES[index].key} selectGame={(game: Game) => dispatch(setGame(game.id))} />
              )}
            />
          ) : (
            <Query query={GET_GAME} variables={{ id: creationState.gameId }}>
              {({ data: { game } }): React.Node => !!game && (
                <>
                  <GameCell game={game} withContainer />
                  <SectionHeaderContainer>
                    <SectionHeader grow>My Pick</SectionHeader>
                    {creationState.bettorPickTeamId && (
                      <MetaButton type="tertiary" icon={<FiX />} onClick={() => dispatch(setBettorPickTeam(null))} />
                    )}
                  </SectionHeaderContainer>
                  <TeamPicker
                    game={game}
                    pickedTeamId={creationState.bettorPickTeamId}
                    selectTeam={(id: number | null) => dispatch(setBettorPickTeam(id))}
                  />
                </>
              )}
            </Query>
          )}
        </Section>
        {creationState.bettee && (
          <>
            <SectionHeader>Trash Talk</SectionHeader>
            <Textarea
              placeholder={`Talk some trash to ${creationState.bettee.firstName}...`}
              value={creationState.wager}
              onChange={evt => dispatch(setWager(evt.target.value))}
              rows={2}
            />
          </>
        )}
        <CreateHunchButton data={creationState} onCreated={onCreated} />
      </Content>
    </Container>
  );
}
