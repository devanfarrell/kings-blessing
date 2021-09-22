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

export const fieldPresentationOrder = ["cows", "wheat", "lumber", "pigs", "fruit", "water", "wool"] as const;
export type FieldType = typeof fieldPresentationOrder[number];

export const extendedFields = [...fieldPresentationOrder, "queen", "king"] as const;

export type ExtendedFieldType = typeof extendedFields[number];

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
