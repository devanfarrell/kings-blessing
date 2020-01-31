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

export const blueSlice = createSlice<Progress>("blue", progressInitialState);

/**
 * Actions
 */

// {section: string, circleIndex: number, sliceIndex: number}
export const updateBlue = blueSlice.createAction<{
  section: string;
  circleIndex: number;
  sliceIndex: number;
}>("UPDATE", (draft, payload) => {
  const { section, circleIndex, sliceIndex } = payload;
  if (draft[section][circleIndex][sliceIndex] === Selection.unselected) {
    draft[section][circleIndex][sliceIndex] = Selection.selected;
  } else if (draft[section][circleIndex][sliceIndex] === Selection.selected) {
    draft[section][circleIndex][sliceIndex] = Selection.unselected;
  }
  return draft;
});

const finalizeAnswers = blueSlice.createAction("finalizeAnswers", draft => {
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

const clearSelectedAnswers = blueSlice.createAction(
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
const rawSelector = blueSlice.selectState();

const blueSelector: any = createSelector(
  [rawSelector],
  (state: Progress) => state
);

export const selectBlueKing = createSelector(
  [blueSelector],
  (state: Progress) => state.king
);

export const selectBlueQueen: any = createSelector(
  [blueSelector],
  (state: Progress) => state.queen
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

export const selectPresentationOrder = createSelector(
  [blueSelector],
  (state: Progress) => state.presentationOrder
);

const selectDoesImplementationMatch = createSelector(
  [selectBlueField, selectBlueKing, selectBlueQueen, selectState],
  (
    fields: Array<Field>,
    king: Field,
    queen: Field,
    { numerator, denominator }
  ) => {
    console.debug("say what...");
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
  [selectBlueQueen, selectBlueKing],
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

export const submitBlueAnswer = blueSlice.createSideEffect(
  "submitAnswerBlue",
  function*() {
    const implementationMatch = yield effects.select(
      selectDoesImplementationMatch
    );
    console.debug("submitted blue answer", implementationMatch);
    if (implementationMatch) {
      yield effects.put(finalizeAnswers());
    } else {
      yield effects.put(clearSelectedAnswers());
    }
    yield effects.put(switchPlayers());
  }
);
