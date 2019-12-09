import { createSlice, createSelector } from "redux-dogma";
import { Progress, progressInitialState } from "./selection";
import { Selection } from "./selection";

export const redSlice = createSlice("red", progressInitialState);

const rawSelector = redSlice.selectState();

export const redSelector: any = createSelector(
  [rawSelector],
  (state: Progress) => state
);

export const redKingSelector: any = createSelector(
  [redSelector],
  (state: Progress) => state.king
);

export const redQueenSelector: any = createSelector(
  [redSelector],
  (state: Progress) => state.queen
);

// {section: string, circleIndex: number, sliceIndex: number}
export const updateRed = redSlice.createAction(
  "UPDATE",
  (draft, { payload }) => {
    const { section, circleIndex, sliceIndex } = payload;
    if (draft[section][circleIndex][sliceIndex] === Selection.unselected) {
      draft[section][circleIndex][sliceIndex] = Selection.selected;
    } else if (draft[section][circleIndex][sliceIndex] === Selection.selected) {
      draft[section][circleIndex][sliceIndex] = Selection.unselected;
    }
    return draft;
  }
);
