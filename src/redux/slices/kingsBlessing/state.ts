import { createSlice, createSelector } from "redux-dogma";

interface Interface {
  turn: number;
  numerator: number;
  demoninator: number;
}

const initialState: Interface = {
  turn: 0,
  numerator: 0,
  demoninator: 0
};

export const stateSlice = createSlice("state", initialState);

export const switchPlayers = stateSlice.createAction(
  "switchTurns",
  (draft: Interface) => {
    draft.turn = (draft.turn + 1) % 2;
    return draft;
  }
);

export const stateSelector = stateSlice.selectState();

export const turnSelector: any = createSelector(
  [stateSelector],
  (state: Interface) => {
    return state.turn ? "blue" : "red";
  }
);
