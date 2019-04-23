// @flow
import Amount from 'components/CreateHunch/Amount';
import Challenger from 'components/CreateHunch/Challenger';
import Game from 'components/CreateHunch/Game';
import Pick from 'components/CreateHunch/Pick';

export type StepProps = {
  valid: boolean,
  goToNext: () => void,
};

export const stepDefaultProps = { goToNext() {}, valid: false };

export const STEPS = {
  AMOUNT: {
    component: Amount,
    key: 'amount',
    validate: state => state.amount > 0,
  },
  CHALLENGER: {
    component: Challenger,
    key: 'challenger',
    validate: state => state.bettee !== null,
  },
  GAME: {
    component: Game,
    key: 'game',
    validate: state => state.gameId !== null,
  },
  PICK: {
    component: Pick,
    key: 'pick',
    preventNav: state => state.gameId === null,
    validate: state => state.bettorPickTeamId !== null,
  },
};

export const STEP_SEQUENCE = [
  STEPS.CHALLENGER,
  STEPS.AMOUNT,
  STEPS.GAME,
  STEPS.PICK,
];
export const NUM_STEPS = STEP_SEQUENCE.length;
