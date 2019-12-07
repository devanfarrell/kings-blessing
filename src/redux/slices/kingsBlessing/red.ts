import { createSlice, createSelector } from "redux-dogma";
import { Progress, progressInitialState } from "./selection";

export const redSlice = createSlice("red", progressInitialState("red"));

const rawSelector = redSlice.selectState();

export const redSelector: any = createSelector(
  [rawSelector],
  (state: Progress) => {
    return state;
  }
);

export const redKingSelector: any = createSelector(
  [redSelector],
  (state: Progress) => {
    return { update: [], active: state.king };
  }
);

export const redQueenSelector: any = createSelector(
  [redSelector],
  (state: Progress) => {
    return { update: [], active: state.queen };
  }
);
