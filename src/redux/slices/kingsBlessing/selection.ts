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
  color: string;
  updates: any;
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
  Array(circleCount).fill(Array(fraction).fill(false));

export const progressInitialState = (color: string): Progress => ({
  presentationOrder,
  cows: initializationUtil(3, 3),
  wheat: initializationUtil(3, 4),
  lumber: initializationUtil(2, 5),
  pigs: initializationUtil(3, 6),
  fruit: initializationUtil(4, 8),
  water: initializationUtil(2, 10),
  wool: initializationUtil(3, 12),
  king: [
    [false, true],
    [false, false, true],
    [...Array(3).fill(false), true, true, ...Array(3).fill(false)]
  ],
  queen: [
    [false, true, false, true, false, true],
    [...Array(3).fill(false), ...Array(7).fill(true)],
    [true, ...Array(10).fill(false), true]
  ],
  color,
  updates: {}
});
