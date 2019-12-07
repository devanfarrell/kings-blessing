import * as React from "react";
import ReactDOM from "react-dom";
import KingsBlessing from "./views/kingsBlessing";
import Provider from "./redux/provider";
import "normalize.css";

ReactDOM.render(
  <Provider children={<KingsBlessing />}></Provider>,
  document.getElementById("root")
);
