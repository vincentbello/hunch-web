// @flow
import * as React from 'react';
import type { User } from 'types/user';

export type CreationData = {
  amount: number,
  bettorPickTeamId: number | null,
  bettee: User | null,
  gameId: number | null,
  wager: string,
};

const initialState = {
  amount: 0,
  bettorPickTeamId: null,
  bettee: null,
  gameId: null,
  wager: '',
};

export const clearForm = () => ({ type: 'CLEAR_FORM' });
export const setAmount = (amount: number) => ({ type: 'SET_HUNCH_AMOUNT', payload: { amount } });
export const setBettee = (bettee: User | null) => ({ type: 'SET_BETTEE', payload: { bettee } });
export const setBettorPickTeam = (id: number | null) => ({ type: 'SET_BETTOR_PICK_TEAM', payload: { bettorPickTeamId: id } });
export const setGame = (gameId: number | null) => ({ type: 'SET_GAME', payload: { gameId } });
export const setWager = (wager: string) => ({ type: 'SET_WAGER', payload: { wager } });

function reducer(state, action) {
  switch (action.type) {
    case 'CLEAR_FORM':
      return { ...initialState };

    case 'SET_HUNCH_AMOUNT':
      return { ...state, amount: action.payload.amount };

    case 'SET_BETTEE':
      return { ...state, bettee: action.payload.bettee };

    case 'SET_BETTOR_PICK_TEAM':
      return { ...state, bettorPickTeamId: action.payload.bettorPickTeamId };

    case 'SET_GAME':
      return { ...state, gameId: action.payload.gameId, bettorPickTeamId: initialState.bettorPickTeamId };

    case 'SET_WAGER':
      return { ...state, wager: action.payload.wager };

    default:
      return state;
  }
}

const HunchCreationContext = React.createContext();

export function HunchCreationProvider(props): React.Node {
  return (
    <HunchCreationContext.Provider value={React.useReducer(reducer, initialState)}>
      {props.children}
    </HunchCreationContext.Provider>
  );
}

export default HunchCreationContext;
