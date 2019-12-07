import * as React from "react";
import { Provider } from "react-redux";
import { createStoreAbstraction } from "redux-dogma";

import { kingsBlessingSlice } from "./slices/kingsBlessing";

const store = createStoreAbstraction()
  .addSlice(kingsBlessingSlice)
  .lockSideEffects()
  .getStore();

const reduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default reduxProvider;
