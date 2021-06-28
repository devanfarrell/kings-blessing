import { Context } from "./stateMachine";

export enum Selection {
  UNSELECTED,
  SELECTED,
  FINALIZED,
  DISABLED,
}

export enum Owner {
  UNOWNED,
  P1,
  P2,
}
export enum Player {
  P1 = "P1",
  P2 = "P2",
}

export type Field = Selection[][];

export type FieldType = "cows" | "wheat" | "lumber" | "pigs" | "fruit" | "water" | "wool";
export const presentationOrder: FieldType[] = ["cows", "wheat", "lumber", "pigs", "fruit", "water", "wool"];
export type ExtendedFieldType = FieldType | "queen" | "king";

export type Fields = Record<ExtendedFieldType, Field>;

export type GoldDie = 1 | 2 | 3 | 4 | 5 | 6 | 0;
export type PurpleDie = 1 | 2 | 4 | 8 | 10 | 12 | 0;

export type TurnData = {
  numerator: GoldDie | PurpleDie;
  denominator: GoldDie | PurpleDie;
  goldDie: GoldDie;
  purpleDie: PurpleDie;
  canRerollGoldDie: boolean;
  canRerollPurpleDie: boolean;
  purpleDieSelected: boolean;
  goldDieSelected: boolean;
};

export const resetTurnData = (): TurnData => ({
  numerator: 0,
  denominator: 0,
  goldDie: 0,
  purpleDie: 0,
  canRerollGoldDie: false,
  canRerollPurpleDie: false,
  purpleDieSelected: false,
  goldDieSelected: false,
});

const initializationUtil = (circleCount: number, fraction: number): Selection[][] => {
  const tempArray = new Array(circleCount).fill(0);
  return tempArray.map(() => new Array(fraction).fill(Selection.UNSELECTED));
};

const resetFields = (): Fields => ({
  cows: initializationUtil(3, 3),
  wheat: initializationUtil(3, 4),
  lumber: initializationUtil(2, 5),
  pigs: initializationUtil(3, 6),
  fruit: initializationUtil(4, 8),
  water: initializationUtil(2, 10),
  wool: initializationUtil(3, 12),
  king: [
    [Selection.UNSELECTED, Selection.DISABLED],
    [Selection.UNSELECTED, Selection.UNSELECTED, Selection.DISABLED],
    [
      ...Array(3).fill(Selection.DISABLED),
      ...Array(2).fill(Selection.UNSELECTED),
      ...Array(3).fill(Selection.DISABLED),
    ],
  ],
  queen: [
    [
      Selection.UNSELECTED,
      Selection.DISABLED,
      Selection.UNSELECTED,
      Selection.DISABLED,
      Selection.UNSELECTED,
      Selection.DISABLED,
    ],
    [...Array(3).fill(Selection.UNSELECTED), ...Array(7).fill(Selection.DISABLED)],
    [Selection.DISABLED, ...Array(10).fill(Selection.UNSELECTED), Selection.DISABLED],
  ],
});

export const resetGame = (): Context => {
  return {
    turnData: resetTurnData(),
    p1Data: resetFields(),
    p2Data: resetFields(),
    claimedFields: {
      cows: Owner.UNOWNED,
      wheat: Owner.UNOWNED,
      lumber: Owner.UNOWNED,
      pigs: Owner.UNOWNED,
      fruit: Owner.UNOWNED,
      water: Owner.UNOWNED,
      wool: Owner.UNOWNED,
    },
  };
};

export const rollPurpleDie = (): PurpleDie => {
  const randomIndex = Math.round(Math.random() * 7776 - 1) % 6;
  const purpleDie: PurpleDie[] = [1, 2, 4, 8, 10, 12];
  return purpleDie[randomIndex];
};

export const rollGoldDie = (): GoldDie => {
  const randomIndex = Math.round(Math.random() * 7776 - 1) % 6;
  const goldDie: GoldDie[] = [1, 2, 3, 4, 5, 6];
  return goldDie[randomIndex];
};
