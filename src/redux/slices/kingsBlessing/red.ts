import { createSlice, createSelector, effects } from "redux-dogma";
import {
  Progress,
  Field,
  progressInitialState,
  Selection,
  selectionReduce
} from "./selection";
import { selectState, switchPlayers } from "./state";
import { fraction, add, compare, number } from "mathjs";

export const redSlice = createSlice<Progress>("red", progressInitialState);

/**
 * Actions
 */

// {section: string, circleIndex: number, sliceIndex: number}
export const updateRed = redSlice.createAction<{
  section: string;
  circleIndex: number;
  sliceIndex: number;
}>("UPDATE", (draft: Progress, { section, circleIndex, sliceIndex }) => {
  if (draft[section][circleIndex][sliceIndex] === Selection.unselected) {
    draft[section][circleIndex][sliceIndex] = Selection.selected;
  } else if (draft[section][circleIndex][sliceIndex] === Selection.selected) {
    draft[section][circleIndex][sliceIndex] = Selection.unselected;
  }
  return draft;
});

const finalizeAnswers = redSlice.createAction("finalizeAnswers", draft => {
  [...draft.presentationOrder, "king", "queen"].forEach(fieldKey => {
    draft[fieldKey].forEach(circle =>
      circle.forEach((slice, i) => {
        if (slice === Selection.selected) {
          circle[i] = Selection.finalized;
        }
      })
    );
  });
});

const clearSelectedAnswers = redSlice.createAction(
  "clearSelectedAnswers",
  draft => {
    [...draft.presentationOrder, "king", "queen"].forEach(fieldKey => {
      draft[fieldKey].forEach(circle =>
        circle.forEach((slice, i) => {
          if (slice === Selection.selected) {
            circle[i] = Selection.unselected;
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
  (
    fields: Array<Field>,
    king: Field,
    queen: Field,
    { numerator, denominator }
  ) => {
    let implementation = fraction(0, 1);

    Object.values(fields).forEach((field: Array<Array<number>>) => {
      let localNumerator = 0;
      field.forEach(circle => {
        localNumerator += circle.reduce(selectionReduce, 0);
      });
      if (localNumerator !== 0) {
        implementation = add(
          fraction(localNumerator, field[0].length),
          implementation
        );
      }
    });

    king.forEach(circle => {
      let localNumerator = 0;
      localNumerator = circle.reduce(selectionReduce, 0);
      if (localNumerator !== 0) {
        implementation = add(
          fraction(localNumerator, circle.length),
          implementation
        );
      }
    });

    queen.forEach(circle => {
      let localNumerator = 0;
      localNumerator = circle.reduce(selectionReduce, 0);
      if (localNumerator !== 0) {
        implementation = add(
          fraction(localNumerator, circle.length),
          implementation
        );
      }
    });

    return (
      number(compare(implementation, fraction(numerator, denominator))) === 0
    );
  }
);

export const selectCanRerollDice = createSelector(
  [selectRedQueen, selectRedKing],
  (queenData: Field, kingData: Field): { purple: boolean; gold: boolean } => {
    const purple = queenData.every(circle =>
      circle.every(pieSlice => pieSlice === Selection.finalized)
    );
    const gold = kingData.every(circle =>
      circle.every(pieSlice => pieSlice === Selection.finalized)
    );
    return { purple, gold };
  }
);

/**
 * Sagas
 */

export const submitRedAnswer = redSlice.createSideEffect(
  "submitAnswerRed",
  function*() {
    const implementationMatch = yield effects.select(
      selectDoesImplementationMatch
    );
    if (implementationMatch) {
      yield effects.put(finalizeAnswers());
    } else {
      yield effects.put(clearSelectedAnswers());
    }
    yield effects.put(switchPlayers(new Date().toISOString()));
  }
);
