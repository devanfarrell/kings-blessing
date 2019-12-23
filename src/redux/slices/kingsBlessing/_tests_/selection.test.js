import { selectionReduce, Selection } from "../selection";

var arr1 = [Selection.selected, Selection.selected];
var arr2 = [
  Selection.selected,
  Selection.selected,
  Selection.selected,
  Selection.selected,
  Selection.selected,
  Selection.selected
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
  Selection.finalized
];

test("Test Selection Reduce", () => {
  expect(arr1.reduce(selectionReduce, 0)).toBe(2);
  expect(arr2.reduce(selectionReduce, 0)).toBe(6);
  expect(arr3.reduce(selectionReduce, 0)).toBe(0);
  expect(arr4.reduce(selectionReduce, 0)).toBe(0);
  expect(arr5.reduce(selectionReduce, 0)).toBe(0);
});
