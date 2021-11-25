import { createMachine, MachineConfig, ActorRefWithDeprecatedState, State, actions } from "xstate";
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
  Player,
} from "./types";
import type { ChildToParentEvents } from "./kings-blessing.machine";
import type { MachineEvent } from "../../types";

type PlayerContext = {
  fields: Fields;
  turnData: TurnData;
  player: Player;
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

type SubmitEvent = MachineEvent<"SUBMIT">;
type LoadEvent = MachineEvent<"LOAD">;

export type Events =
  | LoadEvent
  | MachineEvent<"BEGIN_TURN">
  | MachineEvent<"ROLL_DICE">
  | MachineEvent<"TOGGLE_PURPLE_DIE_SELECTION">
  | MachineEvent<"TOGGLE_GOLD_DIE_SELECTION">
  | SubmitEvent
  | MachineEvent<"TOGGLE_SLICE", { field: ExtendedFieldType; circleIndex: number; cellIndex: number }>;

export type PlayerMachineDef = State<PlayerContext, Events, PlayerMachineStateSchema>;

export type SpawnedPlayerMachine = ActorRefWithDeprecatedState<PlayerContext, Events, PlayerMachineTypestate>;
export type PlayerSendFunc = (event: Events) => any;

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

const getInitialTurnData = (ctx?: PlayerContext): TurnData => ({
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

const sendParentEndTurn = actions.sendParent<PlayerContext, MachineEvent<"SUBMIT">, ChildToParentEvents>((ctx) => {
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

const finalizeAnswers = actions.assign((ctx: PlayerContext, _event: MachineEvent<"SUBMIT">) => {
  extendedFields.forEach((key) => {
    ctx.fields[key] = ctx.fields[key].map((circle) =>
      circle.map((selection) => (selection === Selection.SELECTED ? Selection.FINALIZED : selection))
    );
  });
  return { fields: { ...ctx.fields } };
});

const clearAnswers = actions.assign((ctx: PlayerContext, _event: MachineEvent<"SUBMIT">) => {
  extendedFields.forEach((key) => {
    ctx.fields[key] = ctx.fields[key].map((circle) =>
      circle.map((selection) => (selection === Selection.SELECTED ? Selection.UNSELECTED : selection))
    );
  });
  return { fields: { ...ctx.fields } };
});

const LOCAL_STORAGE_KEY = (player: Player) => `KINGS_BLESSING/${player}`;
const saveContext = (ctx: PlayerContext, _event: any) => {
  localStorage.setItem(LOCAL_STORAGE_KEY(ctx.player), JSON.stringify(ctx));
};

const loadContext = actions.assign<PlayerContext, LoadEvent>((ctx): PlayerContext => {
  const stringState = localStorage.getItem(LOCAL_STORAGE_KEY(ctx.player));
  if (stringState) {
    const state: PlayerContext = JSON.parse(stringState);
    return { fields: state.fields, turnData: state.turnData, player: ctx.player };
  }

  return { fields: resetFields(), turnData: getInitialTurnData(), player: ctx.player };
});

const identifyFraction = (goldDie: GoldDie, purpleDie: PurpleDie) => {
  const [numerator, denominator] = goldDie < purpleDie ? [goldDie, purpleDie] : [purpleDie, goldDie];
  return { numerator, denominator };
};

const rollBothDice = () => {
  const purpleDie = rollPurpleDie();
  const goldDie = rollGoldDie();
  return { purpleDie, goldDie, ...identifyFraction(goldDie, purpleDie) };
};

const initialDiceRoll = actions.assign((ctx: PlayerContext, _event: MachineEvent<"ROLL_DICE">) => {
  const { purpleDie, goldDie, numerator, denominator } = rollBothDice();

  const turnData: TurnData = {
    numerator,
    denominator,
    purpleDie,
    goldDie,
    purpleDieSelected: false,
    goldDieSelected: false,
    canRerollGoldDie: fieldComplete(ctx.fields.king),
    canRerollPurpleDie: fieldComplete(ctx.fields.queen),
  };
  return {
    turnData,
  };
});

const rerollDice = actions.assign((ctx: PlayerContext, _event: MachineEvent<"ROLL_DICE">) => {
  const { purpleDieSelected, goldDieSelected } = ctx.turnData;

  if (purpleDieSelected && goldDieSelected) {
    const { numerator, denominator, goldDie, purpleDie } = rollBothDice();

    const turnData: TurnData = {
      numerator,
      denominator,
      purpleDie,
      goldDie,
      purpleDieSelected: false,
      goldDieSelected: false,
      canRerollGoldDie: false,
      canRerollPurpleDie: false,
    };
    return {
      turnData,
    };
  } else if (purpleDieSelected) {
    const { goldDie } = ctx.turnData;
    const purpleDie = rollPurpleDie();
    const turnData: TurnData = {
      ...identifyFraction(goldDie, purpleDie),
      purpleDie,
      goldDie,
      purpleDieSelected: false,
      goldDieSelected: false,
      canRerollGoldDie: false,
      canRerollPurpleDie: false,
    };
    return {
      turnData,
    };
  } else {
    const { purpleDie } = ctx.turnData;
    const goldDie = rollGoldDie();
    const turnData: TurnData = {
      ...identifyFraction(goldDie, purpleDie),
      purpleDie,
      goldDie,
      purpleDieSelected: false,
      goldDieSelected: false,
      canRerollGoldDie: false,
      canRerollPurpleDie: false,
    };
    return {
      turnData,
    };
  }
});

const resetTurnData = actions.assign<PlayerContext, SubmitEvent>((ctx) => ({ turnData: getInitialTurnData(ctx) }));

const kingsBlessingActorConfig: MachineConfig<PlayerContext, PlayerMachineStateSchema, Events> = {
  id: "PLAYER_MACHINE",
  initial: "awaitingTurn",
  states: {
    awaitingTurn: {
      on: {
        BEGIN_TURN: [
          {
            target: "takingTurn",
            cond: (ctx) => ctx.turnData.goldDie !== 0 && ctx.turnData.purpleDie !== 0,
          },
          {
            target: "awaitingDiceRoll",
          },
        ],
        LOAD: {
          actions: loadContext,
        },
      },
    },
    awaitingDiceRoll: {
      on: {
        ROLL_DICE: {
          target: "takingTurn",
          actions: [initialDiceRoll, saveContext],
        },
      },
    },
    takingTurn: {
      on: {
        TOGGLE_SLICE: {
          actions: actions.assign((ctx, event) => {
            const { field, circleIndex, cellIndex } = event;
            const { fields } = ctx;
            const currentState = fields[field][circleIndex][cellIndex];
            if (currentState !== Selection.DISABLED && currentState !== Selection.FINALIZED) {
              fields[field][circleIndex][cellIndex] =
                currentState === Selection.SELECTED ? Selection.UNSELECTED : Selection.SELECTED;
            }

            return {
              fields: {
                ...fields,
                [field]: fields[field].map((circle, i) => (i !== circleIndex ? circle : [...circle])),
              },
            };
          }),
          cond: (ctx, { field, circleIndex, cellIndex }) => {
            const currentSelectionState = ctx.fields[field][circleIndex][cellIndex];
            return currentSelectionState !== Selection.DISABLED && currentSelectionState !== Selection.FINALIZED;
          },
        },
        TOGGLE_PURPLE_DIE_SELECTION: {
          actions: actions.assign((ctx) => ({
            turnData: { ...ctx.turnData, purpleDieSelected: !ctx.turnData.purpleDieSelected },
          })),
          cond: canRerollPurpleDie,
        },
        TOGGLE_GOLD_DIE_SELECTION: {
          actions: actions.assign((ctx) => ({
            turnData: { ...ctx.turnData, goldDieSelected: !ctx.turnData.goldDieSelected },
          })),
          cond: canRerollGoldDie,
        },
        ROLL_DICE: {
          actions: [rerollDice, saveContext],
        },
        SUBMIT: [
          {
            target: "awaitingTurn",
            cond: matchesSelection,
            actions: [resetTurnData, finalizeAnswers, sendParentEndTurn, saveContext],
          },
          {
            target: "awaitingTurn",
            actions: [resetTurnData, clearAnswers, sendParentEndTurn, saveContext],
          },
        ],
      },
    },
  },
};

export const kingsBlessingActor = (player: Player) =>
  createMachine({
    ...kingsBlessingActorConfig,
    context: { player, fields: resetFields(), turnData: getInitialTurnData() },
  });
