import { createSlice } from "redux-dogma";
import { stateSlice } from "./state";
import { playerSelectionSlice } from "./selection";

export const kingsBlessingSlice = createSlice("kingsBlessing")
  .addSlice(stateSlice)
  .addSlice(playerSelectionSlice);
