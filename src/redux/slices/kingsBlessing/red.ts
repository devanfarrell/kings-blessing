import { createSlice, createSelector, effects } from "redux-dogma";
import {
  Progress,
  progressInitialState,
  Selection,
  selectionReduce,
  createFraction
} from "./selection";
import { selectState } from "./state";

export const redSlice = createSlice("red", progressInitialState);

/**
 * Actions
 */

// {section: string, circleIndex: number, sliceIndex: number}
export const updateRed = redSlice.createAction(
  "UPDATE",
  (draft: Progress, { payload }) => {
    const { section, circleIndex, sliceIndex } = payload;
    if (draft[section][circleIndex][sliceIndex] === Selection.unselected) {
      draft[section][circleIndex][sliceIndex] = Selection.selected;
    } else if (draft[section][circleIndex][sliceIndex] === Selection.selected) {
      draft[section][circleIndex][sliceIndex] = Selection.unselected;
    }
    return draft;
  }
);

const finalizeAnswers = redSlice.createAction(
  "finalizeAnswers",
  (draft: Progress) => {
    draft.presentationOrder.forEach(fieldKey => {
      draft[fieldKey].forEach(circle =>
        circle.forEach(slice => {
          if (slice === Selection.selected) {
            return Selection.finalized;
          }
        })
      );
    });
  }
);

const clearSelectedAnswers = redSlice.createAction(
  "clearSelectedAnswers",
  (draft: Progress) => {
    draft.presentationOrder.forEach(fieldKey => {
      draft[fieldKey].forEach(circle =>
        circle.forEach(slice => {
          if (slice === Selection.selected) {
            return Selection.unselected;
          }
        })
      );
    });
  }
);

/**
 * Selectors
 */
const rawSelector = redSlice.selectState();

export const redSelector: any = createSelector(
  [rawSelector],
  (state: Progress) => state
);

export const selectRedKing: any = createSelector(
  [redSelector],
  (state: Progress) => state.king
);

export const selectRedQueen: any = createSelector(
  [redSelector],
  (state: Progress) => state.queen
);

export const selectRedField = createSelector(
  [redSelector],
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

export const selectPresentationOrder = createSelector(
  [redSelector],
  (state: Progress) => state.presentationOrder
);

const selectDoesImplementationMatch = createSelector(
  [selectRedField, selectRedKing, selectRedQueen, selectState],
  (fields, king, queen, { numerator, denominator }) => {
    const implementations = [];

    Object.values(fields).forEach((field: Array<Array<number>>) => {
      const fraction = createFraction(field[0].length);
      field.forEach(circle => {
        fraction.numerator += circle.reduce(selectionReduce, 0);
      });
      if (fraction.numerator !== 0) {
        implementations.push(fraction);
      }
    });

    king.forEach((circle, i) => {
      const fraction = createFraction(circle.length);
      fraction.numerator = circle.reduce(selectionReduce, 0);
      if (fraction.numerator !== 0) {
        implementations.push(fraction);
      }
    });

    queen.forEach((circle, i) => {
      const fraction = createFraction(circle.length);
      fraction.numerator = circle.reduce(selectionReduce, 0);
      if (fraction.numerator !== 0) {
        implementations.push(fraction);
      }
    });

    console.debug(implementations);

    // Add all the factions together and compare them against the expected value
  }
);

/**
 * Sagas
 */

export const submitRedAnswer = redSlice.createSideEffect(
  "submitAnswer",
  function*() {
    const value = yield effects.select(selectDoesImplementationMatch);
    yield console.debug("stuff", value);
  }
);
