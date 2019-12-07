import { createSlice } from "redux-dogma";
import { stateSlice } from "./state";
import { redSlice } from "./red";
import { blueSlice } from "./blue";

export const kingsBlessingSlice = createSlice("kingsBlessing", {})
  .addSlice(stateSlice)
  .addSlice(redSlice)
  .addSlice(blueSlice);

// export const countSideEffect = kingsBlessingSlice.createSideEffect(
//   "BOOM",
//   function*() {
//     yield console.debug("BOOM DA BOOM BOOM");
//   }
// );
