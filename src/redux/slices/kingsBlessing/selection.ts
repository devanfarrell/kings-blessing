export interface Progress {
  presentationOrder: Array<string>;
  cows: Array<Array<boolean>>;
  wheat: Array<Array<boolean>>;
  lumber: Array<Array<boolean>>;
  pigs: Array<Array<boolean>>;
  fruit: Array<Array<boolean>>;
  water: Array<Array<boolean>>;
  wool: Array<Array<boolean>>;
  king: Array<Array<boolean>>;
  queen: Array<Array<boolean>>;
}

export enum Selection {
  unselected,
  selected,
  finalized
}

const presentationOrder = [
  "cows",
  "wheat",
  "lumber",
  "pigs",
  "fruit",
  "water",
  "wool"
];

const initializationUtil = (circleCount: number, fraction: number) =>
  Array(circleCount).fill(Array(fraction).fill(Selection.unselected));

export const progressInitialState: Progress = {
  presentationOrder,
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
      ...Array(3).fill(Selection.finalized)
    ]
  ],
  queen: [
    [
      Selection.unselected,
      Selection.finalized,
      Selection.unselected,
      Selection.finalized,
      Selection.unselected,
      Selection.finalized
    ],
    [
      ...Array(3).fill(Selection.unselected),
      ...Array(7).fill(Selection.finalized)
    ],
    [
      Selection.finalized,
      ...Array(10).fill(Selection.unselected),
      Selection.finalized
    ]
  ]
};
