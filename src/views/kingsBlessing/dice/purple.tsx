/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import { selectPurpleDie } from "redux/slices/kingsBlessing/state";

export default function PurpleDie() {
  const purpleDie = useSelector(selectPurpleDie);
  return (
    <div css={cssStyle.wrapper(purpleDie == null)}>
      <div css={cssStyle.outset}>{purpleDie || 1}</div>
      <div css={cssStyle.inset}>{purpleDie || 1}</div>
    </div>
  );
}

const cssStyle = {
  wrapper: (uninitialized: boolean) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(
        ellipse farthest-corner at right bottom,
        hsl(269, 99%, 61%) 0%,
        hsl(260, 98%, 59%) 8%,
        hsl(261, 60%, 39%) 30%,
        hsl(262, 49%, 36%) 40%,
        transparent 80%
      ),
      radial-gradient(
        ellipse farthest-corner at left top,
        hsl(0, 0%, 100%) 0%,
        hsl(260, 100%, 84%) 8%,
        hsl(264, 54%, 61%) 25%,
        hsl(261, 50%, 24%) 62.5%,
        hsl(262, 50%, 24%) 100%
      );
    border-radius: 5px;
    width: 75px;
    height: 75px;
    font-size: 24px;
    font-weight: bold;
    flex-direction: column;
    ${uninitialized
      ? `
        opacity: 0.6
    `
      : ``}
  `,
  inset: css`
    font: bold 50px arial, sans-serif;
    color: rgba(255, 255, 255, 0.85);
    line-height: 0px;
  `,
  outset: css`
    font: bold 50px arial, sans-serif;
    color: transparent;
    text-shadow: -1px -1px 2px hsla(262, 50%, 24%, 0.8);
    line-height: 0px;
  `,
};
