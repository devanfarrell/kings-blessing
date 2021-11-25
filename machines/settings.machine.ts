import "tailwindcss/tailwind.css";
import { createMachine, send, actions } from "xstate";
import { MachineEvent } from "../types";

type SettingsContext = Record<BooleanLocalStorageKeys, boolean>;

export enum BooleanLocalStorageKeys {
  tabletop = "tabletop",
}
type InternalEvents = MachineEvent<"LOAD_SETTINGS">;
type ExternalEvents = MachineEvent<"SET_BOOLEAN_SETTING", { key: BooleanLocalStorageKeys; state: boolean }>;
type Events = InternalEvents | ExternalEvents;

const getBooleanSetting = (key: BooleanLocalStorageKeys, fallback: boolean = false): boolean => {
  const savedSetting = localStorage.getItem(key);
  if (!savedSetting) return fallback;
  else return savedSetting === "true";
};

const saveBooleanSettings = (key: BooleanLocalStorageKeys, state: boolean): void => {
  const savedState = state ? "true" : "false";
  localStorage.setItem(key, savedState);
};

export const SettingsMachine = createMachine<SettingsContext, Events>({
  id: "SETTINGS",
  strict: true,
  initial: "idle",
  context: {
    [BooleanLocalStorageKeys.tabletop]: false,
  },
  states: {
    idle: {
      entry: send("LOAD_SETTINGS"),
      on: {
        LOAD_SETTINGS: {
          target: "ready",
          actions: actions.assign(() => {
            return {
              [BooleanLocalStorageKeys.tabletop]: getBooleanSetting(BooleanLocalStorageKeys.tabletop),
            };
          }),
        },
      },
    },
    ready: {
      on: {
        SET_BOOLEAN_SETTING: {
          actions: (ctx, event) => {
            ctx[event.key] = event.state;
            saveBooleanSettings(event.key, event.state);
          },
        },
      },
    },
  },
});
