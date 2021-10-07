import { send, State, createMachine, MachineConfig, actions, spawn, StateMachine } from "xstate";

import { SpawnedPlayerMachine, kingsBlessingActor } from "./player.machine";

import UIFx from "uifx";
import { FieldType, Owner, Player, Selection, fieldPresentationOrder } from "./types";
import { ActionMeta, MachineEvent } from "../../types";
import { inspect } from "@xstate/inspect";
import { assign } from "@xstate/immer";

if (typeof window !== "undefined" && localStorage.getItem("development") === "true") {
  inspect({
    url: "https:statecharts.io/inspect",
    iframe: false,
  });
}

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
    promptResume: {};
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
      value: "promptResume";
      context: Context & {
        [Player.P1]: SpawnedPlayerMachine;
        [Player.P2]: SpawnedPlayerMachine;
        successSound: UIFx;
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
type RunGameEvent = MachineEvent<"RUN">;
type NewGameEvent = MachineEvent<"NEW_GAME">;
type ResumeGameEvent = MachineEvent<"RESUME_GAME">;

export type ExternalEvents = NewGameEvent | ResumeGameEvent;
type InternalEvents = EndTurnEvent | RunGameEvent;
export type Events = ExternalEvents | InternalEvents;

export type MachineDef = State<Context, Events, StateSchema, Typestate>;
export type SendFunc = (event: ExternalEvents) => any;

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

const loadSoundEffects = actions.assign<Context, RunGameEvent>((ctx): Partial<Context> => {
  return {
    successSound: ctx.successSound ? ctx.successSound : new UIFx("/audio/kings_blessing_success.wav", { volume: 0.4 }),
  };
});

const spawnPlayerMachines = actions.assign<Context, any>((): Partial<Context> => {
  const playerOne = spawn(kingsBlessingActor(Player.P1), Player.P1);
  const playerTwo = spawn(kingsBlessingActor(Player.P2), Player.P2);
  return {
    [Player.P1]: playerOne,
    [Player.P2]: playerTwo,
  };
});

const killPlayerMachines = (ctx: Context, _event: NewGameEvent) => {
  ctx[Player.P1]?.stop?.();
  ctx[Player.P2]?.stop?.();
};

const claimNewFields = assign<Context, EndTurnEvent>((ctx, event, { state }) => {
  const owner = state?.matches("playing.P1") ? Owner.P1 : Owner.P2;
  const unclaimedFields = fieldPresentationOrder.filter((field) => ctx.claimedFields[field] === Owner.UNOWNED);
  const newlyClaimedFields = unclaimedFields.filter((field) => event.completedFields.includes(field));

  newlyClaimedFields.forEach((field) => {
    ctx.claimedFields[field] = owner;
  });
  return;
});

type SaveStructure = { claimedFields: Context["claimedFields"]; player: Player };
const LOCAL_STORAGE_KEY = "KINGS_BLESSING/TOP_LEVEL_STATE";

const saveMachineState = (ctx: Context, _event: any, { state }: ActionMeta<Context, any>) => {
  const player = state.matches(Player.P2) ? Player.P2 : Player.P1;
  const saveFile: SaveStructure = { claimedFields: ctx.claimedFields, player };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saveFile));
};

const getSavedState = (): SaveStructure | undefined => {
  const stringSavedFile = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stringSavedFile) return JSON.parse(stringSavedFile);
};

const loadMachineState = assign<Context, ResumeGameEvent>((ctx) => {
  const saveFile = getSavedState();
  if (!saveFile) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    throw new Error("Failed to load previous game");
  }
  ctx.claimedFields = saveFile.claimedFields;
});

const previousGameExists = (_ctx: Context, _event: RunGameEvent): boolean => {
  const existingData = getSavedState();
  if (!existingData) return false;
  // TODO: Better local storage verification
  return true;
};

const deleteSavedState = (_ctx: Context, _event: any) => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

const playSuccessSound = (ctx: Context, _event: EndTurnEvent) => {
  ctx.successSound?.play();
};

const kingsBlessingConfig: MachineConfig<Context, StateSchema, Events> = {
  id: "KINGS_BLESSING_MACHINE",
  initial: "start",
  preserveActionOrder: true,
  context: { claimedFields: getClaimedFields() },
  states: {
    start: {
      entry: send("RUN"),
      on: {
        RUN: [
          {
            target: "promptResume",
            actions: [loadSoundEffects, spawnPlayerMachines],
            cond: previousGameExists,
          },
          {
            target: "playing",
            actions: [saveMachineState, loadSoundEffects, spawnPlayerMachines],
          },
        ],
      },
    },
    promptResume: {
      on: {
        NEW_GAME: {
          target: "playing",
          actions: [saveMachineState],
        },
        RESUME_GAME: [
          {
            target: `playing.${Player.P1}`,
            actions: [
              loadMachineState,
              actions.send("LOAD", { to: Player.P1 }),
              actions.send("LOAD", { to: Player.P2 }),
            ],
            cond: () => {
              const saved = getSavedState();
              return saved!.player === Player.P1;
            },
          },
          {
            target: `playing.${Player.P2}`,
            actions: [
              loadMachineState,
              actions.send("LOAD", { to: Player.P1 }),
              actions.send("LOAD", { to: Player.P2 }),
            ],
          },
        ],
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
                actions: [claimNewFields, playSuccessSound, deleteSavedState, saveMachineState],
              },
              {
                target: Player.P2,
                cond: canClaimNewField,
                actions: [claimNewFields, saveMachineState],
              },
              { target: Player.P2, actions: saveMachineState },
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
                actions: [claimNewFields, playSuccessSound, deleteSavedState, saveMachineState],
              },
              {
                target: Player.P1,
                cond: canClaimNewField,
                actions: [claimNewFields, saveMachineState],
              },
              { target: Player.P1, actions: saveMachineState },
            ],
          },
        },
        p1Wins: {
          on: {
            NEW_GAME: { target: Player.P1, actions: [killPlayerMachines, spawnPlayerMachines] },
          },
        },
        p2Wins: {
          on: {
            NEW_GAME: { target: Player.P1, actions: [killPlayerMachines, spawnPlayerMachines] },
          },
        },
      },
    },
  },
};

export const kingsBlessingMachine: StateMachine<Context, StateSchema, Events, Typestate> =
  createMachine(kingsBlessingConfig);
