import { Machine, send, State, StateNodeConfig, TransitionConfigOrTarget } from "xstate";
import {
  ExtendedFieldType,
  Fields,
  FieldType,
  Owner,
  Player,
  resetGame,
  resetTurnData,
  rollGoldDie,
  rollPurpleDie,
  TurnData,
  Selection,
  GoldDie,
  PurpleDie,
  Field,
} from "./stateMachineUtils";
import { inspect } from "@xstate/inspect";
import { assign } from "@xstate/immer";
import { add, compare, fraction, MathType, number } from "mathjs";

inspect({
  url: "https:statecharts.io/inspect",
  iframe: false,
});

export const selectionReduce = (accumulator: Selection, currentValue: number) =>
  currentValue === Selection.SELECTED ? accumulator + 1 : accumulator;

export type Context = {
  turnData: TurnData;
  p1Data: Fields;
  p2Data: Fields;
  claimedFields: Record<FieldType, Owner>;
};

type States = {
  states: {
    start: {};
    p1: PlayerMachineState;
    p1Wins: {};
    p2: PlayerMachineState;
    p2Wins: {};
  };
};

type ToggleSliceAction = {
  type: `TOGGLE_SLICE`;
  field: ExtendedFieldType;
  circleIndex: number;
  cellIndex: number;
  player: Player;
};

export type Events =
  | { type: "SUBMIT" }
  | { type: "NEW_GAME" }
  | { type: "ROLL_DICE" }
  | ToggleSliceAction
  | { type: "TOGGLE_PURPLE_DIE_SELECTION" }
  | { type: "TOGGLE_GOLD_DIE_SELECTION" };
// | { type: "SPECIAL" };

export type MachineDef = State<Context, Events, States>;
export type SendFunc = (event: Events) => any;

const assignDice = (ctx: Context, goldDie: GoldDie, purpleDie: PurpleDie): void => {
  const [numerator, denominator] = goldDie < purpleDie ? [goldDie, purpleDie] : [purpleDie, goldDie];
  ctx.turnData.goldDie = goldDie;
  ctx.turnData.purpleDie = purpleDie;
  ctx.turnData.numerator = numerator;
  ctx.turnData.denominator = denominator;
};

type PlayerMachineState = {
  states: {
    preRoll: {};
    hasRolled: {};
    submitted: {};
  };
};

/**
 * Guards
 */

const canRerollPurpleDie = (ctx: Context) => ctx.turnData.canRerollPurpleDie;
const canRerollGoldDie = (ctx: Context) => ctx.turnData.canRerollGoldDie;

const isPlayerOne = (_ctx: Context, event: ToggleSliceAction) => event.player === Player.P1;
const isPlayerTwo = (_ctx: Context, event: ToggleSliceAction) => event.player === Player.P2;

const playerOneWins = (ctx: Context) => {
  const total = Object.values(ctx.claimedFields).reduce((acc, current) => (current === Owner.P1 ? acc++ : acc), 0);
  return total >= 4;
};

const playerTwoWins = (ctx: Context) => {
  const total = Object.values(ctx.claimedFields).reduce((acc, current) => (current === Owner.P2 ? acc++ : acc), 0);
  return total >= 4;
};

const matchesSelection = (fields: Fields, numerator: number, denominator: number) => {
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

const playerOneCorrectSelection = (ctx: Context) => {
  const matches = matchesSelection(ctx.p1Data, ctx.turnData.numerator, ctx.turnData.denominator);
  return matches;
};

const playerTwoCorrectSelection = (ctx: Context) => {
  const matches = matchesSelection(ctx.p2Data, ctx.turnData.numerator, ctx.turnData.denominator);
  return matches;
};

const fieldComplete = (field: Field) =>
  field.every((circle) =>
    circle.every((selection) => selection === Selection.FINALIZED || selection === Selection.DISABLED)
  );

/**
 * Shared states
 */

const preRoll: StateNodeConfig<Context, {}, Events> = {
  on: {
    ROLL_DICE: {
      target: "hasRolled",
      actions: assign((ctx, _event, { state }) => {
        const p1Turn = state?.matches("p1");
        const currentPlayerData = p1Turn ? ctx.p1Data : ctx.p2Data;
        const purpleDie = rollPurpleDie();
        const goldDie = rollGoldDie();
        assignDice(ctx, goldDie, purpleDie);
        ctx.turnData.canRerollGoldDie = fieldComplete(currentPlayerData.king);
        ctx.turnData.canRerollPurpleDie = fieldComplete(currentPlayerData.queen);
        ctx.turnData.purpleDieSelected = false;
        ctx.turnData.goldDieSelected = false;
        return;
      }),
    },
  },
};

/**
 * Shared transitions
 */

const ROLL_DICE: TransitionConfigOrTarget<Context, { type: "ROLL_DICE" }> = {
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
};

const TOGGLE_PURPLE_DIE_SELECTION: TransitionConfigOrTarget<Context, { type: "TOGGLE_PURPLE_DIE_SELECTION" }> = {
  actions: assign((ctx) => {
    ctx.turnData.purpleDieSelected = !ctx.turnData.purpleDieSelected;
  }),
  cond: canRerollPurpleDie,
};

const TOGGLE_GOLD_DIE_SELECTION: TransitionConfigOrTarget<Context, { type: "TOGGLE_GOLD_DIE_SELECTION" }> = {
  actions: assign((ctx) => {
    ctx.turnData.goldDieSelected = !ctx.turnData.goldDieSelected;
  }),
  cond: canRerollGoldDie,
};

const toggleSliceBase: TransitionConfigOrTarget<Context, ToggleSliceAction> = {
  target: "hasRolled",
  actions: assign((ctx, event) => {
    const { field, circleIndex, cellIndex, player } = event;
    const playerData = player === Player.P1 ? ctx.p1Data : ctx.p2Data;
    const currentState = playerData[field][circleIndex][cellIndex];
    if (currentState !== Selection.DISABLED && currentState !== Selection.FINALIZED) {
      playerData[field][circleIndex][cellIndex] =
        currentState === Selection.SELECTED ? Selection.UNSELECTED : Selection.SELECTED;
    }
  }),
};

/**
 * Shared actions
 */

const resetContextTurnData = assign((ctx: Context, _event: any) => {
  ctx.turnData = resetTurnData();
});

const finalizeAnswers = assign((ctx: Context, _event: any) => {
  Object.entries(ctx.p1Data).forEach((entry) => {
    const [key, value] = entry as [ExtendedFieldType, Field];
    ctx.p1Data[key] = value.map((circle) =>
      circle.map((selection) => (selection === Selection.SELECTED ? Selection.FINALIZED : selection))
    );
  });

  Object.entries(ctx.p2Data).forEach((entry) => {
    const [key, value] = entry as [ExtendedFieldType, Field];
    ctx.p2Data[key] = value.map((circle) =>
      circle.map((selection) => (selection === Selection.SELECTED ? Selection.FINALIZED : selection))
    );
  });

  Object.entries(ctx.claimedFields).forEach((entry) => {
    const [key, value] = entry as [FieldType, Owner];
    if (value === Owner.UNOWNED) {
      if (fieldComplete(ctx.p1Data[key])) ctx.claimedFields[key] = Owner.P1;
      else if (fieldComplete(ctx.p2Data[key])) ctx.claimedFields[key] = Owner.P2;
    }
  });
});

const clearAnswers = assign((ctx: Context, _event: any) => {
  Object.entries(ctx.p1Data).forEach((entry) => {
    const [key, value] = entry as [ExtendedFieldType, Field];
    ctx.p1Data[key] = value.map((circle) =>
      circle.map((selection) => (selection === Selection.SELECTED ? Selection.UNSELECTED : selection))
    );
  });

  Object.entries(ctx.p2Data).forEach((entry) => {
    const [key, value] = entry as [ExtendedFieldType, Field];
    ctx.p2Data[key] = value.map((circle) =>
      circle.map((selection) => (selection === Selection.SELECTED ? Selection.UNSELECTED : selection))
    );
  });
});

/**
 * State Machine
 */

export const kingsBlessingMachine = Machine<Context, States, Events>({
  id: "KINGS_BLESSING_MACHINE",
  initial: "start",
  context: resetGame(),
  states: {
    start: {
      entry: send("NEW_GAME"),
      on: {
        NEW_GAME: {
          target: "p1",
          actions: assign(resetGame),
        },
      },
    },
    p1: {
      initial: "preRoll",
      states: {
        preRoll,
        hasRolled: {
          on: {
            ROLL_DICE,
            TOGGLE_PURPLE_DIE_SELECTION,
            TOGGLE_GOLD_DIE_SELECTION,
            TOGGLE_SLICE: { ...toggleSliceBase, cond: isPlayerOne },
            // SPECIAL: {
            //   actions: assign((ctx) => {
            //     ctx.p1Data.queen = ctx.p1Data.queen.map((circle) =>
            //       circle.map((selection) =>
            //         selection === Selection.DISABLED ? Selection.DISABLED : Selection.FINALIZED
            //       )
            //     );
            //   }),
            // },
            SUBMIT: [
              {
                target: "submitted",
                cond: playerOneCorrectSelection,
                actions: [resetContextTurnData, finalizeAnswers],
              },
              { target: "submitted", actions: [resetContextTurnData, clearAnswers] },
            ],
          },
        },
        submitted: {
          type: "final",
        },
      },
      onDone: [{ target: "p1Wins", cond: playerOneWins }, { target: "p2" }],
    },

    p2: {
      initial: "preRoll",
      states: {
        preRoll,
        hasRolled: {
          on: {
            ROLL_DICE,
            TOGGLE_PURPLE_DIE_SELECTION,
            TOGGLE_GOLD_DIE_SELECTION,
            TOGGLE_SLICE: { ...toggleSliceBase, cond: isPlayerTwo },
            SUBMIT: [
              {
                target: "submitted",
                cond: playerTwoCorrectSelection,
                actions: [resetContextTurnData, finalizeAnswers],
              },
              { target: "submitted", actions: [resetContextTurnData, clearAnswers] },
            ],
          },
        },
        submitted: {
          type: "final",
        },
      },
      onDone: [{ target: "p2Wins", cond: playerTwoWins }, { target: "p1" }],
    },
    p1Wins: {
      on: {
        NEW_GAME: "start",
      },
    },
    p2Wins: {
      on: {
        NEW_GAME: "start",
      },
    },
  },
});
