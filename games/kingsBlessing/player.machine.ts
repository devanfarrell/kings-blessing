import { createMachine, MachineConfig, ActorRefWithDeprecatedState, State, actions } from "xstate";
import { assign } from "@xstate/immer";
import { add, compare, fraction, MathType, number } from "mathjs";

import {
  ExtendedFieldType,
  Fields,
  TurnData,
  Selection,
  GoldDie,
  PurpleDie,
  Field,
  extendedFields,
  fieldPresentationOrder,
} from "./types";
import { MachineEvent } from "../../types";
// import { inspect } from "@xstate/inspect";

import type { EndTurnEvent } from "./kings-blessing.machine";

// if (typeof window !== "undefined") {
//   inspect({
//     url: "https:statecharts.io/inspect",
//     iframe: false,
//   });
// }

type PlayerContext = {
  fields: Fields;
  turnData: TurnData;
};

type PlayerMachineStateSchema = {
  states: {
    awaitingTurn: {};
    awaitingDiceRoll: {};
    takingTurn: {};
  };
};

type PlayerMachineTypestate = {
  value: any;
  context: PlayerContext;
};
export type Events =
  | MachineEvent<"BEGIN_TURN">
  | MachineEvent<"ROLL_DICE">
  | MachineEvent<"TOGGLE_PURPLE_DIE_SELECTION">
  | MachineEvent<"TOGGLE_GOLD_DIE_SELECTION">
  | MachineEvent<"SUBMIT">
  | MachineEvent<"TOGGLE_SLICE", { field: ExtendedFieldType; circleIndex: number; cellIndex: number }>;

export type PlayerMachineDef = State<PlayerContext, Events, PlayerMachineStateSchema>;

export type SpawnedPlayerMachine = ActorRefWithDeprecatedState<PlayerContext, Events, PlayerMachineTypestate>;
export type PlayerSendFunc = (event: Events) => any;

const initializationUtil = (circleCount: number, fraction: number): Selection[][] => {
  const tempArray = new Array(circleCount).fill(0);
  return tempArray.map(() => new Array(fraction).fill(Selection.FINALIZED));
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

const resetTurnData = (ctx?: PlayerContext): TurnData => ({
  numerator: 0,
  denominator: 0,
  goldDie: 0,
  purpleDie: 0,
  canRerollGoldDie: ctx ? fieldComplete(ctx.fields.king) : false,
  canRerollPurpleDie: ctx ? fieldComplete(ctx.fields.queen) : false,
  purpleDieSelected: false,
  goldDieSelected: false,
});

const purpleDie: PurpleDie[] = [1, 2, 4, 8, 10, 12];
const rollPurpleDie = (): PurpleDie => {
  const randomIndex = Math.round(Math.random() * 7776 - 1) % 6;
  return purpleDie[randomIndex];
};

const goldDie: GoldDie[] = [1, 2, 3, 4, 5, 6];
const rollGoldDie = (): GoldDie => {
  const randomIndex = Math.round(Math.random() * 7776 - 1) % 6;
  return goldDie[randomIndex];
};

const assignDice = (ctx: PlayerContext, goldDie: GoldDie, purpleDie: PurpleDie): void => {
  const [numerator, denominator] = goldDie < purpleDie ? [goldDie, purpleDie] : [purpleDie, goldDie];
  ctx.turnData.goldDie = goldDie;
  ctx.turnData.purpleDie = purpleDie;
  ctx.turnData.numerator = numerator;
  ctx.turnData.denominator = denominator;
};

const endTurn = actions.sendParent<PlayerContext, MachineEvent<"SUBMIT">, EndTurnEvent>((ctx) => {
  const completedFields = fieldPresentationOrder.filter((key) => fieldComplete(ctx.fields[key]));
  return {
    type: "END_TURN",
    completedFields,
  };
});

/**
 * Guards
 */

const fieldComplete = (field: Field) =>
  field.every((circle) =>
    circle.every((selection) => selection === Selection.FINALIZED || selection === Selection.DISABLED)
  );

const matchesSelection = (ctx: PlayerContext) => {
  const { fields, turnData } = ctx;
  const { numerator, denominator } = turnData;
  const allFields = Object.values(fields);
  const totalSelected = allFields.reduce((acc: MathType, currentField) => {
    const currentFieldSelected = currentField.reduce((acc: MathType, currentCircle) => {
      const currentCircleNumerator = currentCircle.reduce(
        (accumulator, selection) => (selection === Selection.SELECTED ? accumulator + 1 : accumulator),
        0
      );
      return add(fraction(currentCircleNumerator, currentCircle.length), acc);
    }, fraction(0, 1));
    return add(currentFieldSelected, acc);
  }, fraction(0, 1));
  return number(compare(totalSelected, fraction(numerator, denominator))) === 0;
};

const canRerollPurpleDie = (ctx: PlayerContext) => ctx.turnData.canRerollPurpleDie;
const canRerollGoldDie = (ctx: PlayerContext) => ctx.turnData.canRerollGoldDie;

/**
 * Named actions
 */

const finalizeAnswers = assign((ctx: PlayerContext, _event: any) => {
  extendedFields.forEach((key) => {
    ctx.fields[key] = ctx.fields[key].map((circle) =>
      circle.map((selection) => (selection === Selection.SELECTED ? Selection.FINALIZED : selection))
    );
  });
});

const clearAnswers = assign((ctx: PlayerContext, _event: any) => {
  extendedFields.forEach((key) => {
    ctx.fields[key] = ctx.fields[key].map((circle) =>
      circle.map((selection) => (selection === Selection.SELECTED ? Selection.UNSELECTED : selection))
    );
  });
});

const kingsBlessingActorConfig: MachineConfig<PlayerContext, PlayerMachineStateSchema, Events> = {
  id: "PLAYER_MACHINE",
  initial: "awaitingTurn",
  context: { fields: resetFields(), turnData: resetTurnData() },
  states: {
    awaitingTurn: {
      on: {
        BEGIN_TURN: {
          target: "awaitingDiceRoll",
          actions: assign((ctx) => (ctx.turnData = resetTurnData(ctx))),
        },
      },
    },
    awaitingDiceRoll: {
      on: {
        ROLL_DICE: {
          target: "takingTurn",
          actions: assign((ctx) => {
            const purpleDie = rollPurpleDie();
            const goldDie = rollGoldDie();
            assignDice(ctx, goldDie, purpleDie);
            ctx.turnData.canRerollGoldDie = fieldComplete(ctx.fields.king);
            ctx.turnData.canRerollPurpleDie = fieldComplete(ctx.fields.queen);
            ctx.turnData.purpleDieSelected = false;
            ctx.turnData.goldDieSelected = false;
          }),
        },
      },
    },
    takingTurn: {
      on: {
        TOGGLE_SLICE: {
          actions: assign((ctx, event) => {
            const { field, circleIndex, cellIndex } = event;
            const { fields } = ctx;
            const currentState = fields[field][circleIndex][cellIndex];
            if (currentState !== Selection.DISABLED && currentState !== Selection.FINALIZED) {
              fields[field][circleIndex][cellIndex] =
                currentState === Selection.SELECTED ? Selection.UNSELECTED : Selection.SELECTED;
            }
          }),
          cond: (ctx, { field, circleIndex, cellIndex }) => {
            const currentSelectionState = ctx.fields[field][circleIndex][cellIndex];
            return currentSelectionState !== Selection.DISABLED && currentSelectionState !== Selection.FINALIZED;
          },
        },
        TOGGLE_PURPLE_DIE_SELECTION: {
          actions: assign((ctx) => {
            ctx.turnData.purpleDieSelected = !ctx.turnData.purpleDieSelected;
          }),
          cond: canRerollPurpleDie,
        },
        TOGGLE_GOLD_DIE_SELECTION: {
          actions: assign((ctx) => {
            ctx.turnData.goldDieSelected = !ctx.turnData.goldDieSelected;
          }),
          cond: canRerollGoldDie,
        },
        ROLL_DICE: {
          actions: assign((ctx) => {
            let goldDie = ctx.turnData.goldDie;
            let purpleDie = ctx.turnData.purpleDie;
            if (ctx.turnData.goldDieSelected) {
              goldDie = rollGoldDie();
              ctx.turnData.canRerollGoldDie = false;
              ctx.turnData.goldDieSelected = false;
            }
            if (ctx.turnData.purpleDieSelected) {
              purpleDie = rollPurpleDie();
              ctx.turnData.canRerollPurpleDie = false;
              ctx.turnData.purpleDieSelected = false;
            }
            assignDice(ctx, goldDie, purpleDie);
          }),
        },
        SUBMIT: [
          {
            target: "awaitingTurn",
            cond: matchesSelection,
            actions: [finalizeAnswers, endTurn],
          },
          { target: "awaitingTurn", actions: [clearAnswers, endTurn] },
        ],
      },
    },
  },
};

export const kingsBlessingActor = createMachine(kingsBlessingActorConfig);
