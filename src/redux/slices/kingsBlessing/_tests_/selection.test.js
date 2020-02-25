import { Selection, genericImplementationMatch } from "../selection";
import { selectionReduce } from "../selectionHelpers";

var arr1 = [Selection.selected, Selection.selected];
var arr2 = [
  Selection.selected,
  Selection.selected,
  Selection.selected,
  Selection.selected,
  Selection.selected,
  Selection.selected,
];
var arr3 = [Selection.unselected, Selection.finalized];
var arr4 = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2];
var arr5 = [
  Selection.finalized,
  Selection.unselected,
  Selection.unselected,
  Selection.unselected,
  Selection.unselected,
  Selection.unselected,
  Selection.unselected,
  Selection.unselected,
  Selection.unselected,
  Selection.unselected,
  Selection.unselected,
  Selection.finalized,
];

test("Test Selection Reduce", () => {
  expect(arr1.reduce(selectionReduce, 0)).toBe(2);
  expect(arr2.reduce(selectionReduce, 0)).toBe(6);
  expect(arr3.reduce(selectionReduce, 0)).toBe(0);
  expect(arr4.reduce(selectionReduce, 0)).toBe(0);
  expect(arr5.reduce(selectionReduce, 0)).toBe(0);
});

var fieldTest1 = {
  cows: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  wheat: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  lumber: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  pigs: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
  fruit: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  water: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  wool: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  king: [
    [0, 2],
    [0, 0, 2],
    [2, 2, 2, 0, 0, 2, 2, 2],
  ],
  queen: [
    [0, 2, 0, 2, 0, 2],
    [1, 1, 0, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  ],
};

var fieldTest2 = {
  cows: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  wheat: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  lumber: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  pigs: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
  fruit: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  water: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  wool: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  king: [
    [0, 2],
    [0, 0, 2],
    [2, 2, 2, 0, 0, 2, 2, 2],
  ],
  queen: [
    [1, 2, 1, 2, 1, 2],
    [0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  ],
};

var fieldTest3 = {
  cows: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  wheat: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  lumber: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  pigs: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
  fruit: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  water: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  wool: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  king: [
    [0, 2],
    [0, 0, 2],
    [2, 2, 2, 0, 0, 2, 2, 2],
  ],
  queen: [
    [1, 2, 1, 2, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ],
};

test("Generic Implementation Matching", function() {
  expect(genericImplementationMatch(fieldTest1, 2, 10)).toEqual({ completedFields: [], implementationMatch: true });
  expect(genericImplementationMatch(fieldTest2, 1, 2)).toEqual({
    completedFields: [],
    implementationMatch: true,
  });
  expect(genericImplementationMatch(fieldTest3, 1, 2)).toEqual({
    completedFields: ["queen"],
    implementationMatch: true,
  });
  expect(genericImplementationMatch(fieldTest3, 1, 3)).toEqual({
    completedFields: [],
    implementationMatch: false,
  });
});
