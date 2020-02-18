import { createSlice, createSelector, effects } from "redux-dogma";
import { StateReducerStructure, selectState, switchPlayers } from "./state";
import { fraction, add, compare, number } from "mathjs";
import { toast } from "react-toastify";
import { kingsBlessingFailSound, kingsBlessingSuccessSound } from "audio";
import { selectionReduce, generateInitialState } from "./selectionHelpers";

export enum Selection {
  unselected,
  selected,
  finalized,
}

export type FieldType = "cows" | "wheat" | "lumber" | "pigs" | "fruit" | "water" | "wool";

type Field = Selection[][];

export interface Fields {
  cows: Field;
  wheat: Field;
  lumber: Field;
  pigs: Field;
  fruit: Field;
  water: Field;
  wool: Field;
  king: Field;
  queen: Field;
}

export interface ReducerStructure {
  red: Fields;
  blue: Fields;
}

const presentationOrder: FieldType[] = ["cows", "wheat", "lumber", "pigs", "fruit", "water", "wool"];

export const playerSelectionSlice = createSlice<ReducerStructure>("playerStructure", generateInitialState());

/***
 *
 * Actions
 *
 */

interface updateAction {
  section: string;
  circleIndex: number;
  sliceIndex: number;
}

export const updateRed = playerSelectionSlice.createAction<updateAction>(
  "UPDATE_RED",
  (draft: ReducerStructure, { section, circleIndex, sliceIndex }) => {
    if (draft.red[section][circleIndex][sliceIndex] === Selection.unselected) {
      draft.red[section][circleIndex][sliceIndex] = Selection.selected;
    } else if (draft[section][circleIndex][sliceIndex] === Selection.selected) {
      draft.red[section][circleIndex][sliceIndex] = Selection.unselected;
    }
  }
);

export const updateBlue = playerSelectionSlice.createAction<updateAction>(
  "UPDATE_BLUE",
  (draft: ReducerStructure, { section, circleIndex, sliceIndex }) => {
    if (draft.blue[section][circleIndex][sliceIndex] === Selection.unselected) {
      draft.blue[section][circleIndex][sliceIndex] = Selection.selected;
    } else if (draft[section][circleIndex][sliceIndex] === Selection.selected) {
      draft.blue[section][circleIndex][sliceIndex] = Selection.unselected;
    }
  }
);

const finalizeAnswers = playerSelectionSlice.createAction<"red" | "blue">("finalizeAnswers", (draft, player) => {
  [...presentationOrder, "king", "queen"].forEach(fieldKey => {
    draft[player][fieldKey].forEach(circle =>
      circle.forEach((slice, i) => {
        if (slice === Selection.selected) {
          circle[i] = Selection.finalized;
        }
      })
    );
  });
});

const clearSelectedAnswers = playerSelectionSlice.createAction<"red" | "blue">("clearAnswers", (draft, player) => {
  [...presentationOrder, "king", "queen"].forEach(fieldKey => {
    draft[player][fieldKey].forEach(circle =>
      circle.forEach((slice, i) => {
        if (slice === Selection.selected) {
          circle[i] = Selection.unselected;
        }
      })
    );
  });
});

/**
 * Selectors
 */

const rawSelector = playerSelectionSlice.selectState();

export const redSelector = createSelector<any, ReducerStructure, Fields>(
  [rawSelector],
  (state: ReducerStructure) => state.red
);
export const blueSelector = createSelector<any, ReducerStructure, Fields>(
  [rawSelector],
  (state: ReducerStructure) => state.blue
);

export const selectRedKing = createSelector<any, Fields, Field>([redSelector], state => state.king);
export const selectBlueKing = createSelector<any, Fields, Field>([blueSelector], state => state.king);

export const selectRedQueen = createSelector<any, Fields, Field>([redSelector], state => state.queen);
export const selectBlueQueen = createSelector<any, Fields, Field>([blueSelector], state => state.queen);

export const selectRedField = createSelector<any, Fields, Fields>([redSelector], state => state);
export const selectBlueField = createSelector<any, Fields, Fields>([blueSelector], state => state);

export const selectPresentationOrder = (): FieldType[] => presentationOrder;

const selectDoesRedImplementationMatch = createSelector<any, Fields, StateReducerStructure, boolean>(
  [redSelector, selectState],
  (fields, { numerator, denominator }) => {
    let implementation = fraction(0, 1);

    Object.values(fields).forEach((field: Array<Array<number>>) => {
      let localNumerator = 0;
      field.forEach(circle => {
        localNumerator += circle.reduce(selectionReduce, 0);
      });
      if (localNumerator !== 0) {
        implementation = add(fraction(localNumerator, field[0].length), implementation);
      }
    });

    return number(compare(implementation, fraction(numerator, denominator))) === 0;
  }
);

const selectDoesBlueImplementationMatch = createSelector<any, Fields, StateReducerStructure, boolean>(
  [blueSelector, selectState],
  (fields, { numerator, denominator }) => {
    let implementation = fraction(0, 1);

    Object.values(fields).forEach((field: Array<Array<number>>) => {
      let localNumerator = 0;
      field.forEach(circle => {
        localNumerator += circle.reduce(selectionReduce, 0);
      });
      if (localNumerator !== 0) {
        implementation = add(fraction(localNumerator, field[0].length), implementation);
      }
    });

    return number(compare(implementation, fraction(numerator, denominator))) === 0;
  }
);

export const selectCanRedRerollDice = createSelector<any, Field, Field, { purple: boolean; gold: boolean }>(
  [selectRedQueen, selectRedKing],
  (queenData, kingData) => {
    const purple = queenData.every(circle => circle.every(pieSlice => pieSlice === Selection.finalized));
    const gold = kingData.every(circle => circle.every(pieSlice => pieSlice === Selection.finalized));
    return { purple, gold };
  }
);

export const selectCanBlueRerollDice = createSelector<any, Field, Field, { purple: boolean; gold: boolean }>(
  [selectBlueQueen, selectBlueKing],
  (queenData, kingData) => {
    const purple = queenData.every(circle => circle.every(pieSlice => pieSlice === Selection.finalized));
    const gold = kingData.every(circle => circle.every(pieSlice => pieSlice === Selection.finalized));
    return { purple, gold };
  }
);

/**
 * Sagas
 */

export const submitRedAnswer = playerSelectionSlice.createSideEffect("submitAnswerRed", function*() {
  const implementationMatch = yield effects.select(selectDoesRedImplementationMatch);
  if (implementationMatch) {
    toast.error("Way to go Red!");
    yield effects.put(finalizeAnswers("red"));
    kingsBlessingSuccessSound.play();
  } else {
    toast.error("Sorry, better luck next time.");
    yield effects.put(clearSelectedAnswers("red"));
    kingsBlessingFailSound.play();
  }
  yield effects.put(switchPlayers(new Date().toISOString()));
});

export const submitBlueAnswer = playerSelectionSlice.createSideEffect("submitAnswerBlue", function*() {
  const implementationMatch = yield effects.select(selectDoesBlueImplementationMatch);
  if (implementationMatch) {
    toast.info("Way to go Blue!");
    yield effects.put(finalizeAnswers("blue"));
    kingsBlessingSuccessSound.play();
  } else {
    toast.info("Sorry, better luck next time.");
    yield effects.put(clearSelectedAnswers("blue"));
    kingsBlessingFailSound.play();
  }
  yield effects.put(switchPlayers());
});
