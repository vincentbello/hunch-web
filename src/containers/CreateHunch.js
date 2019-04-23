// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import HunchCreationContext, { clearForm, setWager } from 'contexts/HunchCreationContext';
import useDocumentTitle from 'hooks/useDocumentTitle';

import getNextInvalidStepKey from 'utils/getNextInvalidStepKey';
import { STEPS, STEP_SEQUENCE } from 'constants/create-hunch';
import { KEYCODES } from 'constants/dom';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import useKeyPressHandlers from 'hooks/useKeyPressHandlers';
import Button from 'components/Button';
import CreateHunchButton from 'components/CreateHunchButton';
import ProgressTracker from 'components/CreateHunch/ProgressTracker';
import Tracker from 'components/CreateHunch/Tracker';
import KeyIndicator from 'components/KeyIndicator';

import { type RouterProps } from 'types/router';

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
  border-radius: 4px;
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
  const navSteps = React.useMemo(() => ({
    previous: STEP_SEQUENCE[index - 1],
    next: STEP_SEQUENCE[index + 1],
  }), [index]);
  const prevDisabled = !navSteps.previous || (navSteps.previous.preventNav && navSteps.previous.preventNav(creationState));
  const nextDisabled = !navSteps.next || (navSteps.next.preventNav && navSteps.next.preventNav(creationState));
  const goToPrevious = () => { console.log('PREV'); if (!prevDisabled) history.push(`/hunch/new/${navSteps.previous.key}`); };
  const goToNext = () => { console.log('NEXT'); if (!nextDisabled) history.push(`/hunch/new/${navSteps.next.key}`); };

  useKeyPressHandlers(
    {
      [KEYCODES.LEFT]: goToPrevious,
      [KEYCODES.RIGHT]: goToNext,
    },
    {
      deps: [prevDisabled, nextDisabled, match.params.step],
      passthrough: match.params.step !== STEPS.CHALLENGER.key,
    },
  );

  if (step === null) return <Redirect to={`/hunch/new/${STEP_SEQUENCE[0].key}`} />;

  const Component = step.component;
  const validityMap = STEP_SEQUENCE.reduce((acc, step) => {
    acc[step.key] = step.validate(creationState);
    return acc;
  }, {});

  return (
    <Container>
      <Tracker state={creationState} validityMap={validityMap} />
      <ProgressTracker valid={Object.values(validityMap).every(val => val)} stepIndex={index} />
      <NavButtons>
        <Button
          buttonTitle={<>Previous{!prevDisabled && <>&nbsp;&nbsp;<KeyIndicator char="←" tint={colors.brand.primary} /></>}</>}
          disabled={prevDisabled}
          type="tertiary"
          leftIcon={<FiChevronsLeft />}
          onClick={goToPrevious}
        />
        <Button
          buttonTitle={<>{!nextDisabled && <><KeyIndicator char="→" tint={colors.brand.primary} />&nbsp;&nbsp;</>}Next</>}
          disabled={!navSteps.next || (navSteps.next.preventNav && navSteps.next.preventNav(creationState))}
          type="tertiary"
          rightIcon={<FiChevronsRight />}
          onClick={goToNext}
        />
      </NavButtons>
      <Content>
        <Component valid={validityMap[step.key]} goToNext={() => history.push(getNextInvalidStepKey(index, creationState))} />
      </Content>
      <Footer>
        <Textarea
          placeholder={`Talk some trash${creationState.bettee === null ? '' : ` to ${creationState.bettee.firstName}`}...`}
          value={creationState.wager}
          onChange={evt => dispatch(setWager(evt.target.value))}
        />
        <CreateHunchButton data={creationState} onCreated={onCreated} />
      </Footer>
    </Container>
  );
}
