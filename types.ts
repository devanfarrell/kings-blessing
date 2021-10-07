import { ReactElement, FunctionComponent } from "react";
import { ActionMeta as xstateActionMeta, ActionObject, EventObject } from "xstate";

// Functional Component without children
export interface FC<P = {}> {
  (props: P): ReactElement<any, any>;
}

// Functional Component with children AKA "Composable FC"
export type CFC<P = {}> = FunctionComponent<P>;

export type MachineEvent<E extends string, P = {}> = {
  type: E;
} & P;

export type ActionMeta<Context, Event extends EventObject> = xstateActionMeta<
  Context,
  Event,
  ActionObject<Context, Event>
>;
