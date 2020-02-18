import { createSlice, createSelector } from "redux-dogma";
import { cloneDeep } from "lodash";

export type GoldDie = 1 | 2 | 3 | 4 | 5 | 6 | null;
export type PurpleDie = 1 | 2 | 4 | 8 | 10 | 12 | null;

export interface StateReducerStructure {
  turn: number;
  numerator: number;
  denominator: number;
  goldDie: GoldDie;
  purpleDie: PurpleDie;
  haveRerolledGoldDie: boolean;
  haveRerolledPurpleDie: boolean;
}

const initialState: StateReducerStructure = {
  turn: 0,
  numerator: 0,
  denominator: 0,
  goldDie: null,
  purpleDie: null,
  haveRerolledGoldDie: false,
  haveRerolledPurpleDie: false,
};

function rollPurpleDie(): PurpleDie {
  const randomIndex = Math.round(Math.random() * 7776 - 1) % 6;
  const purpleDie: Array<PurpleDie> = [1, 2, 4, 8, 10, 12];
  return purpleDie[randomIndex];
}

function rollGoldDie(): GoldDie {
  const randomIndex = Math.round(Math.random() * 7776 - 1) % 6;
  const goldDie: Array<GoldDie> = [1, 2, 3, 4, 5, 6];
  return goldDie[randomIndex];
}

export const stateSlice = createSlice<StateReducerStructure>("state", cloneDeep(initialState));

/**
 * Actions
 */

export const switchPlayers = stateSlice.createAction("switchTurns", draft => {
  const nextTurn = (draft.turn + 1) % 2;
  Object.keys(draft).forEach(key => {
    draft[key] = initialState[key];
  });
  draft.turn = nextTurn;
  return;
});

export const rollDice = stateSlice.createAction("rollDice", draft => {
  draft.goldDie = rollGoldDie();
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

export const rerollGoldDie = stateSlice.createAction("rerollGoldDie", draft => {
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

export const rerollPurpleDie = stateSlice.createAction("rerollPurpleDie", draft => {
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

export const selectTurn = createSelector([selectState], (state: StateReducerStructure): "blue" | "red" => {
  return state.turn ? "blue" : "red";
});

export const selectGoldDie = createSelector(
  [selectState],
  (state: StateReducerStructure): GoldDie => {
    return state.goldDie;
  }
);

export const selectPurpleDie = createSelector(
  [selectState],
  (state: StateReducerStructure): PurpleDie => {
    return state.purpleDie;
  }
);
