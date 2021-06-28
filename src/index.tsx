import ReactDOM from "react-dom";
import KingsBlessing from "./views/kingsBlessing";
import { Global } from "@emotion/react";
import "normalize.css";
import { globalStyles } from "theme";
import "./fontAwesome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <>
    <Global styles={[globalStyles]} />
    <KingsBlessing />
    <ToastContainer />
  </>,
  document.getElementById("root")
);
