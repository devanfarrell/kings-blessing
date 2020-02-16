import * as React from "react";
import ReactDOM from "react-dom";
import KingsBlessing from "./views/kingsBlessing";
import Provider from "./redux/provider";
import { Global } from "@emotion/core";
import "normalize.css";
import { globalStyles } from "theme";
import "./fontAwesome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <Provider
    children={
      <>
        <Global styles={[globalStyles]} />
        <KingsBlessing />
        <ToastContainer />
      </>
    }
  ></Provider>,
  document.getElementById("root")
);
