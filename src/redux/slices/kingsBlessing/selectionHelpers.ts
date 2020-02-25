import { Selection, ReducerStructure, Fields } from "./selection";

const initializationUtil = (circleCount: number, fraction: number): Selection[][] => {
  const tempArray = new Array(circleCount).fill(0);
  return tempArray.map(() => new Array(fraction).fill(Selection.unselected));
};

const fieldsInitialState = (): Fields => ({
  cows: initializationUtil(3, 3),
  wheat: initializationUtil(3, 4),
  lumber: initializationUtil(2, 5),
  pigs: initializationUtil(3, 6),
  fruit: initializationUtil(4, 8),
  water: initializationUtil(2, 10),
  wool: initializationUtil(3, 12),
  king: [
    [Selection.unselected, Selection.finalized],
    [Selection.unselected, Selection.unselected, Selection.finalized],
    [
      ...Array(3).fill(Selection.finalized),
      ...Array(2).fill(Selection.unselected),
      ...Array(3).fill(Selection.finalized),
    ],
  ],
  queen: [
    [
      Selection.unselected,
      Selection.finalized,
      Selection.unselected,
      Selection.finalized,
      Selection.unselected,
      Selection.finalized,
    ],
    [...Array(3).fill(Selection.unselected), ...Array(7).fill(Selection.finalized)],
    [Selection.finalized, ...Array(10).fill(Selection.unselected), Selection.finalized],
  ],
});

export const generateInitialState = (): ReducerStructure => ({
  blue: fieldsInitialState(),
  red: fieldsInitialState(),
  claimedField: {
    cows: null,
    wheat: null,
    lumber: null,
    pigs: null,
    fruit: null,
    water: null,
    wool: null,
  },
});

export const selectionReduce = (accumulator: Selection, currentValue: number) =>
  currentValue === Selection.selected ? accumulator + 1 : accumulator;
