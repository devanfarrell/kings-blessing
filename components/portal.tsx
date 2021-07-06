import { FC } from "react";
import { useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";

export const Portal: FC = ({ children }) => {
  const el = useRef(document.createElement("div"));

  useLayoutEffect(() => {
    const portalRoot = document.getElementById("modal-container");
    const child = el.current;
    if (portalRoot) {
      portalRoot.appendChild(child);
      return () => {
        portalRoot.removeChild(child);
      };
    }
  }, []);

  return ReactDOM.createPortal(children, el.current);
};
