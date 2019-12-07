import { createSlice, createSelector } from "redux-dogma";
import { Progress, progressInitialState } from "./selection";

export const blueSlice = createSlice("blue", progressInitialState("blue"));

const rawSelector = blueSlice.selectState();

export const turnSelector: any = createSelector(
  [rawSelector],
  (state: Progress) => {
    return state;
  }
);

export const blueSelector: any = createSelector(
  [rawSelector],
  (state: Progress) => {
    return state;
  }
);

export const blueKingSelector: any = createSelector(
  [blueSelector],
  (state: Progress) => {
    return { update: [], active: state.king };
  }
);

export const blueQueenSelector: any = createSelector(
  [blueSelector],
  (state: Progress) => {
    return { update: [], active: state.queen };
  }
);
