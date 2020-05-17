import { createSlice, createSelector } from "redux-dogma";
import { RedOrBlue } from "./selection";
import { NEW_GAME } from "./actions";

export type GoldDie = 1 | 2 | 3 | 4 | 5 | 6 | 0;
export type PurpleDie = 1 | 2 | 4 | 8 | 10 | 12 | 0;

export interface StateReducerStructure {
  turn: number;
  numerator: number;
  denominator: number;
  goldDie: GoldDie;
  purpleDie: PurpleDie;
  haveRerolledGoldDie: boolean;
  haveRerolledPurpleDie: boolean;
}

const initialState = (): StateReducerStructure => ({
  turn: 0,
  numerator: 0,
  denominator: 0,
  goldDie: 0,
  purpleDie: 0,
  haveRerolledGoldDie: false,
  haveRerolledPurpleDie: false,
});

function rollPurpleDie(): PurpleDie {
  const randomIndex = Math.round(Math.random() * 7776 - 1) % 6;
  const purpleDie: PurpleDie[] = [1, 2, 4, 8, 10, 12];
  return purpleDie[randomIndex];
}

function rollGoldDie(): GoldDie {
  const randomIndex = Math.round(Math.random() * 7776 - 1) % 6;
  const goldDie: GoldDie[] = [1, 2, 3, 4, 5, 6];
  return goldDie[randomIndex];
}

export const stateSlice = createSlice<StateReducerStructure>("state", initialState());

/**
 * Actions
 */

stateSlice.addAction(NEW_GAME, (draft) => {
  Object.assign(draft, initialState());
});

export const switchPlayers = stateSlice.createSimpleAction("switchTurns", (draft: StateReducerStructure) => {
  const nextTurn = (draft.turn + 1) % 2;
  Object.assign(draft, initialState());
  draft.turn = nextTurn;
  return;
});

export const rollDice = stateSlice.createSimpleAction("rollDice", (draft: StateReducerStructure) => {
  draft.goldDie = rollGoldDie();
  draft.purpleDie = rollPurpleDie();
  if (draft.goldDie != null && draft.purpleDie != null) {
    if (draft.goldDie > draft.purpleDie) {
      draft.numerator = draft.purpleDie;
      draft.denominator = draft.goldDie;
    } else {
      draft.numerator = draft.goldDie;
      draft.denominator = draft.purpleDie;
    }
  }
  return;
});

export const rerollGoldDie = stateSlice.createSimpleAction("rerollGoldDie", (draft: StateReducerStructure) => {
  draft.haveRerolledGoldDie = true;
  draft.goldDie = rollGoldDie();
  if (draft.goldDie > draft.purpleDie) {
    draft.numerator = draft.purpleDie;
    draft.denominator = draft.goldDie;
  } else {
    draft.numerator = draft.goldDie;
    draft.denominator = draft.purpleDie;
  }

  return;
});

export const rerollPurpleDie = stateSlice.createSimpleAction("rerollPurpleDie", (draft: StateReducerStructure) => {
  draft.haveRerolledPurpleDie = true;
  draft.purpleDie = rollPurpleDie();
  if (draft.goldDie > draft.purpleDie) {
    draft.numerator = draft.purpleDie;
    draft.denominator = draft.goldDie;
  } else {
    draft.numerator = draft.goldDie;
    draft.denominator = draft.purpleDie;
  }

  return;
});

/**
 * Selectors
 */

export const selectState = stateSlice.selectState();

export const selectTurn = createSelector(
  [selectState],
  (state: StateReducerStructure): RedOrBlue => {
    return state.turn ? "blue" : "red";
  }
);

export const selectGoldDie = createSelector<any, StateReducerStructure, GoldDie>(
  [selectState],
  (state) => state.goldDie
);

export const selectPurpleDie = createSelector<any, StateReducerStructure, PurpleDie>(
  [selectState],
  (state) => state.purpleDie
);

export const selectHaveRerolled = createSelector<any, StateReducerStructure, { gold: boolean; purple: boolean }>(
  [selectState],
  (state) => ({ gold: state.haveRerolledGoldDie, purple: state.haveRerolledPurpleDie })
);
