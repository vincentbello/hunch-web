// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Query } from 'react-apollo';
import GET_GAME from 'graphql/queries/getGame';
import { STEPS } from 'constants/create-hunch';
import type { CreationState } from 'contexts/HunchCreationContext';
import type { RouterProps } from 'types/router';
import { ClassNames } from '@emotion/core';
import { darken } from 'polished';
import styled from '@emotion/styled';
import common from 'theme/common';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';
import EntityCell from 'components/EntityCell';

type Props = RouterProps & {
  state: CreationState,
};

const StepList = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  margin: ${spacing(1, 2, 0)};
  padding: 0;
`;

const Step = styled.li`
  list-style-type: none;
  z-index: 1;
  flex: 1 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 50px;
  margin-right: ${spacing(1)};
  ${props => props.disabled ? `pointer-events: none;` : ''}

  &:last-of-type {
    margin-right: 0;
  }
`;

const Superscript = styled.span`
  font-size: 12px;
  position: relative;
  top: -4px;
`;

const StyledLink = styled(NavLink, { shouldForwardProp: prop => !['plainText', 'valid'].includes(prop) })(props => {
  const color = props.valid ? (props.plainText ? colors.primary.green : colors.text.primary) : (props.active ? colors.black : colors.text.secondary);
  const borderColor = props.valid ? colors.primary.green : colors.borders.main;
  return `
    ${common.reset.link}
    padding: ${props.valid ? 0 : spacing(2)};
    border-width: 2px;
    border-style: ${props.valid ? 'solid' : 'dashed'};
    border-color: ${borderColor};
    border-radius: 4px;
    font-size: ${props.valid && props.plainText ? '18px' : '14px'};
    background-color: ${props.valid ? colors.white : colors.background};
    color: ${color};
    display: block;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    font-weight: ${props.valid && props.plainText ? '800' : '500'};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 250ms, border-color 250ms, font-size 250ms;

    &:hover {
      border-color: ${darken(0.15, borderColor)};
      color: ${darken(0.15, color)};
    }
  `;
});

const ProgressLine = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${props => props.valid ? colors.primary.green : colors.borders.main};
`;

type StepContainerProps = {
  children: React.Node,
  plainText: boolean,
  step: string,
  valid: boolean,
};
const stepContainerDefaultProps = { disabled: false, plainText: false, valid: false };

function StepContainer({ children, disabled, plainText, step, valid }: StepContainerProps) {
  return (
    <ClassNames>
      {({ css }) => {
        const borderColor = darken(0.15, valid ? colors.primary.green : colors.borders.focus);
        const activeClassName = css`border-color: ${borderColor} !important;`;
        return (
          <Step disabled={disabled} valid={valid}>
            <StyledLink exact to={`/hunch/new/${step}`} plainText={plainText} valid={valid} activeClassName={activeClassName}>
              {children}
            </StyledLink>
          </Step>
        );
      }}
    </ClassNames>
  );
}
StepContainer.defaultProps = stepContainerDefaultProps;

function CreationTracker({ history, state }: Props) {
  const isBetteeValid = state.bettee !== null;
  const isAmountValid = state.amount > 0;
  const isGameValid = state.gameId !== null;
  const isPickValid = isGameValid && state.bettorPickTeamId !== null;
  const gameSteps = (game: Game | null) => (
    <>
      <StepContainer step={STEPS.GAME.key} valid={isGameValid}>
        {isGameValid ? <strong>{`${game.awayTeam.abbreviation} - ${game.homeTeam.abbreviation}`}</strong> : 'Game'}
      </StepContainer>
      <StepContainer disabled={!isGameValid} step={STEPS.PICK.key} valid={isPickValid}>
        {isPickValid ? (
          <EntityCell centered entity={game.awayTeam.id === state.bettorPickTeamId ? game.awayTeam : game.homeTeam} small type="team" />
        ) : 'My Pick'}
      </StepContainer>
    </>
  );
  return (
    <StepList>
      <ProgressLine valid={isBetteeValid && isAmountValid && isGameValid && isPickValid} />
      <StepContainer step={STEPS.CHALLENGER.key} valid={isBetteeValid}>
        {isBetteeValid ? <EntityCell centered entity={state.bettee} small /> : 'Challenger'}
      </StepContainer>
      <StepContainer plainText step={STEPS.AMOUNT.key} valid={isAmountValid}>
        <Superscript>$</Superscript>{state.amount}
      </StepContainer>
      {state.gameId === null ? gameSteps(null) : (
        <Query query={GET_GAME} variables={{ id: state.gameId }}>
          {({ data: { game } }): React.Node => !!game && gameSteps(game)}
        </Query>
      )}
    </StepList>
  );
}
export default withRouter(CreationTracker);
