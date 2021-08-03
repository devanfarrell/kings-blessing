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
