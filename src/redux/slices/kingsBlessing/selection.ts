import { createSlice, createSelector, effects } from "redux-dogma";
import { StateReducerStructure, selectState, switchPlayers } from "./state";
import { fraction, add, compare, number, MathType } from "mathjs";
import { toast } from "react-toastify";
import { kingsBlessingFailSound, kingsBlessingSuccessSound } from "audio";
import { selectionReduce, generateInitialState } from "./selectionHelpers";

export enum Selection {
  unselected,
  selected,
  finalized,
}

export type RedOrBlue = "red" | "blue";

export type FieldType = "cows" | "wheat" | "lumber" | "pigs" | "fruit" | "water" | "wool";

export type ExtendedFieldType = FieldType | "queen" | "king";

export const presentationOrder: FieldType[] = ["cows", "wheat", "lumber", "pigs", "fruit", "water", "wool"];
const extendedFieldArray: ExtendedFieldType[] = [...presentationOrder, "king", "queen"];

export type Field = Selection[][];

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

type ClaimedFields = {
  [key in FieldType]: null | RedOrBlue;
};

export interface ReducerStructure {
  red: Fields;
  blue: Fields;
  claimedField: ClaimedFields;
}

export const playerSelectionSlice = createSlice<ReducerStructure>("playerStructure", generateInitialState());

/***
 *
 * Actions
 *
 */

interface updateAction {
  section: ExtendedFieldType;
  circleIndex: number;
  sliceIndex: number;
}

export const updateRed = playerSelectionSlice.createAction<updateAction>(
  "UPDATE_RED",
  (draft: ReducerStructure, { section, circleIndex, sliceIndex }) => {
    if (draft.red[section][circleIndex][sliceIndex] === Selection.unselected) {
      draft.red[section][circleIndex][sliceIndex] = Selection.selected;
    } else if (draft.red[section][circleIndex][sliceIndex] === Selection.selected) {
      draft.red[section][circleIndex][sliceIndex] = Selection.unselected;
    }
  }
);

export const updateBlue = playerSelectionSlice.createAction<updateAction>(
  "UPDATE_BLUE",
  (draft: ReducerStructure, { section, circleIndex, sliceIndex }) => {
    if (draft.blue[section][circleIndex][sliceIndex] === Selection.unselected) {
      draft.blue[section][circleIndex][sliceIndex] = Selection.selected;
    } else if (draft.blue[section][circleIndex][sliceIndex] === Selection.selected) {
      draft.blue[section][circleIndex][sliceIndex] = Selection.unselected;
    }
  }
);

const finalizeAnswers = playerSelectionSlice.createAction<RedOrBlue>("finalizeAnswers", (draft, player: RedOrBlue) => {
  extendedFieldArray.forEach((fieldKey) => {
    draft[player][fieldKey].forEach((circle) =>
      circle.forEach((slice, i) => {
        if (slice === Selection.selected) {
          circle[i] = Selection.finalized;
        }
      })
    );
  });
});

const clearSelectedAnswers = playerSelectionSlice.createAction<RedOrBlue>("clearAnswers", (draft, player) => {
  extendedFieldArray.forEach((fieldKey) => {
    draft[player][fieldKey].forEach((circle) =>
      circle.forEach((slice, i) => {
        if (slice === Selection.selected) {
          circle[i] = Selection.unselected;
        }
      })
    );
  });
});

const claimField = playerSelectionSlice.createAction<{ player: RedOrBlue; field: FieldType }>(
  "claimField",
  (draft, { player, field }) => {
    draft.claimedField[field] = player;
  }
);

/**
 * Selectors
 */

const rawSelector = playerSelectionSlice.selectState();

export const redSelector = createSelector<any, ReducerStructure, Fields>([rawSelector], (reducer) => reducer.red);
export const blueSelector = createSelector<any, ReducerStructure, Fields>([rawSelector], (reducer) => reducer.blue);

export const selectRedKing = createSelector<any, Fields, Field>([redSelector], (state) => state.king);
export const selectBlueKing = createSelector<any, Fields, Field>([blueSelector], (state) => state.king);

export const selectRedQueen = createSelector<any, Fields, Field>([redSelector], (state) => state.queen);
export const selectBlueQueen = createSelector<any, Fields, Field>([blueSelector], (state) => state.queen);

export const selectRedField = createSelector<any, Fields, Fields>([redSelector], (state) => state);
export const selectBlueField = createSelector<any, Fields, Fields>([blueSelector], (state) => state);

export const selectPresentationOrder = (): FieldType[] => presentationOrder;

type ImplementationMatching = { implementationMatch: boolean; completedFields: ExtendedFieldType[] };

export function genericImplementationMatch(
  fields: Fields,
  numerator: number,
  denominator: number
): ImplementationMatching {
  let implementation: MathType = fraction(0, 1);
  const modifiedFields: ExtendedFieldType[] = [];
  let completedFields: ExtendedFieldType[] = [];

  const entries = Object.entries(fields) as [ExtendedFieldType, Field][];
  console.debug(fields, completedFields);
  entries.forEach(([fieldKey, field]) => {
    field.forEach((circle) => {
      const circleNumerator = circle.reduce(selectionReduce, 0);
      if (circleNumerator) {
        implementation = add(fraction(circleNumerator, circle.length), implementation);
        if (!modifiedFields.includes(fieldKey)) {
          modifiedFields.push(fieldKey);
        }
      }
    });
  });

  const implementationMatch = number(compare(implementation, fraction(numerator, denominator))) === 0;

  if (implementationMatch) {
    // check the modified fields. If any of them are complete, return it in an object called completed fields
    const result: Array<ExtendedFieldType | null> = modifiedFields.map((fieldType) =>
      fields[fieldType].every((circle) =>
        circle.every(
          (implementation) => implementation === Selection.finalized || implementation === Selection.selected
        )
      )
        ? fieldType
        : null
    );
    completedFields = result.filter((type) => type !== null) as ExtendedFieldType[];
  }

  return { implementationMatch, completedFields };
}

const selectDoesRedImplementationMatch = createSelector<any, Fields, StateReducerStructure, ImplementationMatching>(
  [redSelector, selectState],
  (fields, { numerator, denominator }) => {
    return genericImplementationMatch(fields, numerator, denominator);
  }
);

const selectDoesBlueImplementationMatch = createSelector<any, Fields, StateReducerStructure, ImplementationMatching>(
  [blueSelector, selectState],
  (fields, { numerator, denominator }) => {
    return genericImplementationMatch(fields, numerator, denominator);
  }
);

function canReroll(queenData: Field, kingData: Field): { purple: boolean; gold: boolean } {
  const purple = queenData.every((circle) => circle.every((pieSlice) => pieSlice === Selection.finalized));
  const gold = kingData.every((circle) => circle.every((pieSlice) => pieSlice === Selection.finalized));
  return { purple, gold };
}

export const selectCanRedRerollDice = createSelector<any, Field, Field, { purple: boolean; gold: boolean }>(
  [selectRedQueen, selectRedKing],
  (queenData, kingData) => canReroll(queenData, kingData)
);

export const selectCanBlueRerollDice = createSelector<any, Field, Field, { purple: boolean; gold: boolean }>(
  [selectBlueQueen, selectBlueKing],
  (queenData, kingData) => canReroll(queenData, kingData)
);

const selectClaimedFields = createSelector<any, ReducerStructure, ClaimedFields>(
  [rawSelector],
  (data) => data.claimedField
);

export const selectOwnedFields = createSelector<any, ClaimedFields, Array<null | RedOrBlue>>(
  [selectClaimedFields],
  (claimedFields) => presentationOrder.map((fieldName) => claimedFields[fieldName])
);

/**
 * Sagas
 */

function genericSuccess(player: RedOrBlue) {
  if (player === "red") {
    toast.error("Way to go Red!");
  } else {
    toast.info("Way to go Blue!");
  }
  kingsBlessingSuccessSound.play();
}

function* submitAnswerAbstraction(player: RedOrBlue, implementationMatch: ImplementationMatching) {
  if (implementationMatch.implementationMatch) {
    if (implementationMatch.completedFields.length > 0) {
      const fields: ClaimedFields = yield effects.select(selectClaimedFields);
      let didClaimField: boolean = false;
      for (let i of implementationMatch.completedFields) {
        if (i === "king") {
          if (player === "red") {
            toast.error(`You completed King's Blessing. You can reroll the gold die!`);
          } else {
            toast.info(`You completed King's Blessing. You can reroll the gold die!`);
          }
        } else if (i === "queen") {
          if (player === "red") {
            toast.error(`You completed Queen's Blessing. You can reroll the purple die!`);
          } else {
            toast.info(`You completed Queen's Blessing. You can reroll the purple die!`);
          }
        } else if (fields[i] === null) {
          didClaimField = true;
          yield effects.put(claimField({ player, field: i }));
          if (player === "red") {
            toast.error(`Red completed the ${i} field!`);
          } else {
            toast.info(`Blue completed the ${i} field!`);
          }
        }
      }
      if (didClaimField) {
        kingsBlessingSuccessSound.play();
      } else {
        genericSuccess(player);
      }
    } else {
      genericSuccess(player);
    }
    yield effects.put(finalizeAnswers(player));
  } else {
    if (player === "red") {
      toast.error("Sorry, better luck next time.");
    } else {
      toast.info("Sorry, better luck next time.");
    }

    yield effects.put(clearSelectedAnswers(player));
    kingsBlessingFailSound.play();
  }

  yield effects.put(switchPlayers());
}

export const submitRedAnswer = playerSelectionSlice.createSideEffect("submitAnswerRed", function* () {
  const implementationMatch: ImplementationMatching = yield effects.select(selectDoesRedImplementationMatch);
  yield submitAnswerAbstraction("red", implementationMatch);
});

export const submitBlueAnswer = playerSelectionSlice.createSideEffect("submitAnswerBlue", function* () {
  const implementationMatch: ImplementationMatching = yield effects.select(selectDoesBlueImplementationMatch);
  yield submitAnswerAbstraction("blue", implementationMatch);
});
