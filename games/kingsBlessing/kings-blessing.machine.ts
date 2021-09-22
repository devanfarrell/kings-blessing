import { send, State, createMachine, MachineConfig, actions, spawn, StateMachine } from "xstate";

import { SpawnedPlayerMachine, kingsBlessingActor } from "./player.machine";

import UIFx from "uifx";
import { FieldType, Owner, Player, Selection, fieldPresentationOrder } from "./types";
import { MachineEvent } from "../../types";
import { inspect } from "@xstate/inspect";
import { assign } from "@xstate/immer";

if (typeof window !== "undefined") {
  inspect({
    url: "https:statecharts.io/inspect",
    iframe: false,
  });
}

export const selectionReduce = (accumulator: Selection, currentValue: number) =>
  currentValue === Selection.SELECTED ? accumulator + 1 : accumulator;

const getClaimedFields = (): Record<FieldType, Owner> => ({
  cows: Owner.UNOWNED,
  wheat: Owner.UNOWNED,
  lumber: Owner.UNOWNED,
  pigs: Owner.UNOWNED,
  fruit: Owner.UNOWNED,
  water: Owner.UNOWNED,
  wool: Owner.UNOWNED,
});

export type Context = {
  claimedFields: Record<FieldType, Owner>;
  [Player.P1]?: SpawnedPlayerMachine;
  [Player.P2]?: SpawnedPlayerMachine;
  successSound?: UIFx;
};

type StateSchema = {
  states: {
    start: {};
    playing: {
      states: {
        [Player.P1]: {};
        [Player.P2]: {};
        p1Wins: {};
        p2Wins: {};
      };
    };
  };
};

type Typestate =
  | {
      value: "start";
      context: Context & {
        [Player.P1]: undefined;
        [Player.P2]: undefined;
        successSound: undefined;
      };
    }
  | {
      value: "playing";
      context: Context & {
        [Player.P1]: SpawnedPlayerMachine;
        [Player.P2]: SpawnedPlayerMachine;
        successSound: UIFx;
      };
    }
  | { value: "playing.p1Wins"; context: Context }
  | { value: "playing.p2Wins"; context: Context };

export type EndTurnEvent = MachineEvent<"END_TURN", { completedFields: FieldType[] }>;

export type Events = MachineEvent<"NEW_GAME"> | EndTurnEvent;

export type MachineDef = State<Context, Events, StateSchema, Typestate>;
export type SendFunc = (event: Events) => any;

/**
 * Guards
 */

const playerOneWins = (ctx: Context, event: EndTurnEvent): boolean => {
  const unclaimedFields = fieldPresentationOrder.filter((field) => ctx.claimedFields[field] === Owner.UNOWNED);
  const newlyClaimedFields = unclaimedFields.filter((field) => event.completedFields.includes(field));
  const currentlyClaimedField = fieldPresentationOrder.filter((field) => ctx.claimedFields[field] === Owner.P1);
  return newlyClaimedFields.length + currentlyClaimedField.length >= 4;
};

const playerTwoWins = (ctx: Context, event: EndTurnEvent): boolean => {
  const unclaimedFields = fieldPresentationOrder.filter((field) => ctx.claimedFields[field] === Owner.UNOWNED);
  const newlyClaimedFields = unclaimedFields.filter((field) => event.completedFields.includes(field));
  const currentlyClaimedField = fieldPresentationOrder.filter((field) => ctx.claimedFields[field] === Owner.P2);
  return newlyClaimedFields.length + currentlyClaimedField.length >= 4;
};

const canClaimNewField = (ctx: Context, event: EndTurnEvent): boolean => {
  const unclaimedFields = fieldPresentationOrder.filter((field) => ctx.claimedFields[field] === Owner.UNOWNED);
  const newlyClaimedFields = unclaimedFields.filter((field) => event.completedFields.includes(field));
  return newlyClaimedFields.length > 0;
};

/**
 * Named Actions
 */

const claimNewFields = assign<Context, EndTurnEvent>((ctx, event, { state }) => {
  const owner = state?.matches("playing.P1") ? Owner.P1 : Owner.P2;
  const unclaimedFields = fieldPresentationOrder.filter((field) => ctx.claimedFields[field] === Owner.UNOWNED);
  const newlyClaimedFields = unclaimedFields.filter((field) => event.completedFields.includes(field));

  newlyClaimedFields.forEach((field) => {
    ctx.claimedFields[field] = owner;
  });

  return;
});

const playSuccessSound = (ctx: Context, _event: EndTurnEvent) => {
  ctx.successSound?.play();
};

const kingsBlessingConfig: MachineConfig<Context, StateSchema, Events> = {
  id: "KINGS_BLESSING_MACHINE",
  initial: "start",
  context: { claimedFields: getClaimedFields() },
  states: {
    start: {
      entry: send("NEW_GAME"),
      on: {
        NEW_GAME: {
          target: "playing",
          actions: actions.assign((ctx) => {
            const playerOne = spawn(kingsBlessingActor, Player.P1);
            const playerTwo = spawn(kingsBlessingActor, Player.P2);
            return {
              [Player.P1]: playerOne,
              [Player.P2]: playerTwo,
              successSound: ctx.successSound
                ? ctx.successSound
                : new UIFx("/audio/kings_blessing_success.wav", { volume: 0.4 }),
            };
          }),
        },
      },
    },
    playing: {
      initial: Player.P1,
      states: {
        [Player.P1]: {
          entry: actions.send("BEGIN_TURN", { to: Player.P1 }),
          on: {
            END_TURN: [
              {
                target: "p1Wins",
                cond: playerOneWins,
                actions: [claimNewFields, playSuccessSound],
              },
              {
                target: Player.P2,
                cond: canClaimNewField,
                actions: claimNewFields,
              },
              { target: Player.P2 },
            ],
          },
        },
        [Player.P2]: {
          entry: actions.send("BEGIN_TURN", { to: Player.P2 }),
          on: {
            END_TURN: [
              {
                target: "p2Wins",
                cond: playerTwoWins,
                actions: [claimNewFields, playSuccessSound],
              },
              {
                target: Player.P1,
                cond: canClaimNewField,
                actions: claimNewFields,
              },
              { target: Player.P1 },
            ],
          },
        },
        p1Wins: {},
        p2Wins: {},
      },
    },
  },
  on: {
    NEW_GAME: "start",
  },
};

export const kingsBlessingMachine: StateMachine<Context, StateSchema, Events, Typestate> =
  createMachine(kingsBlessingConfig);
