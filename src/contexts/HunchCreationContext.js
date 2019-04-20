// @flow
import * as React from 'react';

const initialState = {
  amount: 0,
  bettorPickTeamId: null,
  bettee: null,
  gameId: null,
  dateViewIndex: 0,
  wager: '',
};

export const clearForm = () => ({ type: 'CLEAR_FORM' });
export const setHunchAmount = (amount: number) => ({ type: 'SET_HUNCH_AMOUNT', payload: { amount } });
export const setBettee = (bettee: User | null) => ({ type: 'SET_BETTEE', payload: { bettee } });
export const setBettorPickTeam = (id: number | null) => ({ type: 'SET_BETTOR_PICK_TEAM', payload: { bettorPickTeamId: id } });
export const setDateViewIndex = (dateViewIndex: number) => ({ type: 'SET_DATE_VIEW_INDEX', payload: { dateViewIndex } });
export const setGame = (gameId: number | null) => ({ type: 'SET_GAME', payload: { gameId } });
export const setHunchWager = (wager: string) => ({ type: 'SET_WAGER', payload: { wager } });

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

    case 'SET_DATE_VIEW_INDEX':
      return { ...state, dateViewIndex: action.payload.dateViewIndex };

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
