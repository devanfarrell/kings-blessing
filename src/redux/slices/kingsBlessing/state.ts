import { createSlice, createSelector } from "redux-dogma";
import { cloneDeep } from "lodash";

type GoldDie = 1 | 2 | 3 | 4 | 5 | 6 | null;
type PurpleDie = 1 | 2 | 4 | 8 | 10 | 12 | null;

interface Interface {
  turn: number;
  numerator: number;
  denominator: number;
  goldDie: GoldDie;
  purpleDie: PurpleDie;
  haveRerolledGoldDie: boolean;
  haveRerolledPurpleDie: boolean;
}

const initialState: Interface = {
  turn: 0,
  numerator: 0,
  denominator: 0,
  goldDie: null,
  purpleDie: null,
  haveRerolledGoldDie: false,
  haveRerolledPurpleDie: false
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

export const stateSlice = createSlice("state", cloneDeep(initialState));

/**
 * Actions
 */

export const switchPlayers = stateSlice.createAction(
  "switchTurns",
  (draft: Interface) => {
    const nextTurn = (draft.turn + 1) % 2;
    draft = cloneDeep(initialState);
    draft.turn = nextTurn;
    return draft;
  }
);

export const rollDice = stateSlice.createAction(
  "rollDice",
  (draft: Interface) => {
    draft.goldDie = rollGoldDie();
    draft.purpleDie = rollPurpleDie();
    if (draft.goldDie > draft.purpleDie) {
      draft.numerator = draft.purpleDie;
      draft.denominator = draft.goldDie;
    } else {
      draft.numerator = draft.goldDie;
      draft.denominator = draft.purpleDie;
    }
    return draft;
  }
);

export const rerollGoldDie = stateSlice.createAction(
  "rerollGoldDie",
  (draft: Interface) => {
    draft.haveRerolledGoldDie = true;
    draft.goldDie = rollGoldDie();
    if (draft.goldDie > draft.purpleDie) {
      draft.numerator = draft.purpleDie;
      draft.denominator = draft.goldDie;
    } else {
      draft.numerator = draft.goldDie;
      draft.denominator = draft.purpleDie;
    }
    return draft;
  }
);

export const rerollPurpleDie = stateSlice.createAction(
  "rerollPurpleDie",
  (draft: Interface) => {
    draft.haveRerolledPurpleDie = true;
    draft.purpleDie = rollPurpleDie();
    if (draft.goldDie > draft.purpleDie) {
      draft.numerator = draft.purpleDie;
      draft.denominator = draft.goldDie;
    } else {
      draft.numerator = draft.goldDie;
      draft.denominator = draft.purpleDie;
    }
    return draft;
  }
);

/**
 * Selectors
 */

export const selectState = stateSlice.selectState();

export const selectTurn: any = createSelector(
  [selectState],
  (state: Interface) => {
    return state.turn ? "blue" : "red";
  }
);
