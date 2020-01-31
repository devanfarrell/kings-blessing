/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import GoldDie from "./gold";
import PurpleDie from "./purple";
import { submitRedAnswer } from "redux/slices/kingsBlessing/red";
import { submitBlueAnswer } from "redux/slices/kingsBlessing/blue";
import { Button } from "atoms";
import useDice from "./useDice";

export default function Dice() {
  const dispatch = useDispatch();
  const { goldDie, purpleDie, turn, rollDice } = useDice();
  const endTurn = useCallback(() => {
    if (turn === "red") {
      dispatch(submitRedAnswer());
    } else {
      dispatch(submitBlueAnswer());
    }
  }, [dispatch, turn]);
  return (
    <div css={dice(turn)}>
      <div css={styles.playAreaWrapper}>
        <div>
          <Button disabled={!!goldDie && !!purpleDie} onClick={rollDice}>
            Roll Dice
          </Button>
        </div>
        <div css={styles.diceWrapper}>
          {purpleDie < goldDie && <PurpleDie />}
          <GoldDie />
          {purpleDie >= goldDie && <PurpleDie />}
        </div>
        <div>
          <Button disabled={!goldDie && !purpleDie} onClick={endTurn}>
            End Turn
          </Button>
        </div>
      </div>
    </div>
  );
}

const radius = "20px";
const dice = turn => {
  const backgrounColor =
    turn === "red" ? "hsla(14, 100%, 53%, 0.99)" : "hsla(220, 100%, 53%, 0.99)";
  const borderRadius =
    turn === "red"
      ? `border-top-left-radius: ${radius}; border-top-right-radius: ${radius};`
      : `border-bottom-left-radius: ${radius}; border-bottom-right-radius: ${radius};`;
  return css`
    height 220px;
    background-color: ${backgrounColor};
    position: fixed;
    bottom: 0px;
    width: 100%;
    ${borderRadius}
    ${turn === "red" ? "bottom: 0px;" : "top: 0px;"}`;
};

const styles = {
  playAreaWrapper: css`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
  `,
  diceWrapper: css`
    display: flex;
    flex-direction: column;
    height: 180px;
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
};
