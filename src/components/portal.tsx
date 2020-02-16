import { useRef, useLayoutEffect, memo } from "react";
import ReactDOM from "react-dom";

const portalRoot = document.getElementById("modal-container");

const Portal = memo(({ children }) => {
  const el = useRef(document.createElement("div"));

  useLayoutEffect(() => {
    const child = el.current;
    portalRoot.appendChild(child);

    return () => portalRoot.removeChild(child);
  }, []);

  return ReactDOM.createPortal(children, el.current);
});

export default Portal;
