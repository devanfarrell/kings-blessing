import { createSlice, createSelector } from "redux-dogma";
import { Progress, progressInitialState } from "./selection";
import { Selection } from "./selection";

export const blueSlice = createSlice("blue", progressInitialState);

const rawSelector = blueSlice.selectState();

export const turnSelector: any = createSelector(
  [rawSelector],
  (state: Progress) => {
    return state;
  }
);

export const blueSelector: any = createSelector(
  [rawSelector],
  (state: Progress) => state
);

export const blueKingSelector: any = createSelector(
  [blueSelector],
  (state: Progress) => state.king
);

export const blueQueenSelector: any = createSelector(
  [blueSelector],
  (state: Progress) => state.queen
);

// {section: string, circleIndex: number, sliceIndex: number}
export const updateBlue = blueSlice.createAction(
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

export const selectBlueField = createSelector(
  [blueSelector],
  ({ cows, wheat, lumber, pigs, fruit, water, wool }) => ({
    cows,
    wheat,
    lumber,
    pigs,
    fruit,
    water,
    wool
  })
);
