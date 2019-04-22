// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import HunchCreationContext, { clearForm, setWager } from 'contexts/HunchCreationContext';
import useDocumentTitle from 'hooks/useDocumentTitle';

import { STEPS, STEP_SEQUENCE } from 'constants/create-hunch';
import { DATE_VIEW_TYPES } from 'constants/view-types';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import GameList from 'containers/GameList';
import AmountInput from 'components/AmountInput';
import Button from 'components/Button';
import CreateHunchButton from 'components/CreateHunchButton';
import CreationTracker from 'components/CreationTracker';
import GameCell from 'components/GameCell';
import TabView from 'components/TabView';
import TeamPicker from 'components/TeamPicker';
import SectionHeader from 'components/SectionHeader';
import FriendSelect from 'components/FriendSelect';

import { type RouterProps } from 'types/router';
import { type Game as GameType } from 'types/game';
import { type User } from 'types/user';

import styled from '@emotion/styled';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1 0 0;
  overflow-y: auto;
`;

const Footer = styled.footer`
  padding: ${spacing(2)};
  border-top: 2px solid ${colors.borders.main};
`;

const TEXTAREA_HEIGHT = 44;
const Textarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  margin-bottom: ${spacing(2)};
  padding: ${spacing(3)};
  border: 1px solid ${colors.borders.main};
  font-size: 16px;
  border-radius: 2px;
  box-sizing: border-box;
  height: ${TEXTAREA_HEIGHT}px;
  transition: height 250ms, border-color 250ms;

  &:focus {
    border-color: ${colors.borders.focus};
    height: ${TEXTAREA_HEIGHT * 2}px;
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function CreateHunch({ history, match }: RouterProps) {
  useDocumentTitle('New Hunch');
  const [creationState, dispatch] = React.useContext(HunchCreationContext);
  const onCreated = React.useMemo(() => () => {
    history.push('/hunches/pending');
    setTimeout(() => dispatch(clearForm()), 1000);
  });
  const { step, index } = React.useMemo(() => {
    const index = STEP_SEQUENCE.findIndex(step => step.key === match.params.step);
    return { index, step: index >= 0 ? STEP_SEQUENCE[index] : null };
  }, [match.params.step]);

  if (step === null) return <Redirect to={`/hunch/new/${STEP_SEQUENCE[0].key}`} />;
  const Component = step.component;
  const navSteps = React.useMemo(() => ({
    previous: STEP_SEQUENCE[index - 1],
    next: STEP_SEQUENCE[index + 1],
  }), [index]);

  return (
    <Container>
      <CreationTracker state={creationState} />
      <NavButtons>
        <Button
          buttonTitle="Previous"
          disabled={!navSteps.previous || (navSteps.previous.preventNav && navSteps.previous.preventNav(creationState))}
          type="tertiary"
          leftIcon={<FiChevronsLeft />}
          onClick={() => history.push(`/hunch/new/${navSteps.previous.key}`)}
        />
        <Button
          buttonTitle="Next"
          disabled={!navSteps.next || (navSteps.next.preventNav && navSteps.next.preventNav(creationState))}
          type="tertiary"
          rightIcon={<FiChevronsRight />}
          onClick={() => history.push(`/hunch/new/${navSteps.next.key}`)}
        />
      </NavButtons>
      <Content>
        <Component valid={step.validate(creationState)} />
      </Content>
      <Footer>
        <Textarea
          placeholder={`Talk some trash${creationState.bettee === null ? '' : ` to ${creationState.bettee.firstName}`}...`}
          value={creationState.wager}
          onChange={evt => dispatch(setWager(evt.target.value))}
        />
        <CreateHunchButton data={creationState} onCreated={onCreated} />
      </Footer>
      {/* <Header>
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
      </Content> */}
    </Container>
  );
}
