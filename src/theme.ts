import { css } from "@emotion/core";

export const globalStyles = css`
  html,
  body {
    line-height: 2rem;
    text-transform: initial;
    letter-spacing: initial;
    color: #212b36;
    font-family: "Open Sans" sans-serif;
  }

  html {
      font-size: 10px;
      text-size-adject: 100%
      text-rending: optimizeLegibility;
  }

  body {
      font-size: 1.6rem;
      font-weight: 400;
      min-height: 100%;
      margin: 0;
      padding: 0;
  }

  *, :after, :before {
      scrollbar-width: thin;
      box-sizing: border-box;
  }

  :focus {
      outline: none; // Because of this decision, all accessability must be done by hand
  }

  #modal-container {
     position: absolute;
     top: 0;
     left: 0;
  }
`;

export const colors = {
  blue: "#3498db",
  red: "#e74c3c",
  lightBlue: "#a8d3f0",
  lightRed: "#f1968e",
  darkRed: "#881d11",
  darkBlue: "#1b6698",
};
