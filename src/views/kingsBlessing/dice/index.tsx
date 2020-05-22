/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { GoldDie, PurpleDie } from "./die";
import { submitRedAnswer, submitBlueAnswer, RedOrBlue } from "redux/slices/kingsBlessing/selection";
import { Button } from "atoms";
import useDice from "./useDice";
import { colors } from "theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { rerollGoldDie, rerollPurpleDie } from "redux/slices/kingsBlessing/state";

export default function Dice() {
  const { canRerollGold, canRerollPurple } = useDice();
  const [expanded, setExpanded] = useState(true);
  const [purpleSelected, setPurpleSelected] = useState(false);
  const [goldSelected, setGoldSelected] = useState(false);
  const dispatch = useDispatch();
  const { goldDie, purpleDie, turn, rollDice } = useDice();
  const haveRolled = !!goldDie && !!purpleDie;
  const rerollText = purpleSelected && goldSelected ? "Reroll Dice" : "Reroll Die";
  const rollText = !haveRolled ? "Roll Dice" : purpleSelected || goldSelected ? rerollText : "Roll Dice";
  const endTurn = useCallback(() => {
    if (turn === "red") {
      dispatch(submitRedAnswer());
    } else {
      dispatch(submitBlueAnswer());
    }
    setPurpleSelected(false);
    setGoldSelected(false);
  }, [dispatch, turn, setPurpleSelected, setGoldSelected]);

  const onPurpleDiceClick = useCallback(() => {
    if (haveRolled && canRerollPurple) {
      setPurpleSelected(!purpleSelected);
    }
  }, [haveRolled, canRerollPurple, setPurpleSelected, purpleSelected]);

  const onGoldDiceClick = useCallback(() => {
    if (haveRolled && canRerollGold) {
      setGoldSelected(!goldSelected);
    }
  }, [haveRolled, canRerollGold, setGoldSelected, goldSelected]);

  const onRollClick = useCallback(() => {
    if (haveRolled) {
      if (purpleSelected) {
        dispatch(rerollPurpleDie());
      }
      if (goldSelected) {
        dispatch(rerollGoldDie());
      }
    } else {
      rollDice();
    }
    setPurpleSelected(false);
    setGoldSelected(false);
  }, [dispatch, rollDice, haveRolled, purpleSelected, goldSelected, setPurpleSelected, setGoldSelected]);

  console.debug(haveRolled && !purpleSelected && !goldSelected);
  return (
    <div css={styles.positionWrapper(turn, expanded)}>
      {turn === "red" && (
        <div css={styles.tabRow}>
          <div onClick={() => setExpanded(!expanded)} css={styles.tab(turn, expanded)}>
            <FontAwesomeIcon color={colors.purple} icon={["fad", "angle-down"]} size="2x" />
          </div>
        </div>
      )}
      <div css={styles.outerPlayAreaWrapper(turn, expanded)}>
        <div css={styles.innerPlayAreaWrapper}>
          <div>
            <Button disabled={haveRolled && !purpleSelected && !goldSelected} onClick={onRollClick}>
              {rollText}
            </Button>
          </div>
          <div css={styles.diceWrapper(expanded)}>
            {purpleDie < goldDie && <PurpleDie selected={purpleSelected} onClick={onPurpleDiceClick} />}
            <GoldDie selected={goldSelected} onClick={onGoldDiceClick} />
            {purpleDie >= goldDie && <PurpleDie selected={purpleSelected} onClick={onPurpleDiceClick} />}
          </div>
          <div>
            <Button disabled={!haveRolled} onClick={endTurn}>
              End Turn
            </Button>
          </div>
        </div>
      </div>
      {turn === "blue" && (
        <div css={styles.tabRow}>
          <div onClick={() => setExpanded(!expanded)} css={styles.tab(turn, expanded)}>
            <FontAwesomeIcon color={colors.purple} icon={["fad", "angle-up"]} size="2x" />
          </div>
        </div>
      )}
    </div>
  );
}

const radius = "20px";

const styles = {
  tab: (turn: RedOrBlue, expanded: boolean) => {
    const borderRadius =
      turn === "red"
        ? `border-top-left-radius: 50px; border-top-right-radius: 50px;`
        : `border-bottom-left-radius: 50px; border-bottom-right-radius: 50px;`;
    return css`
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      ${borderRadius}
      background-color: white;
      height: 50px;
      cursor: pointer;
      svg {
        transition: all ease-in-out 200ms;
        transform: rotate(${expanded ? "0" : "180deg"});
      }
    `;
  },
  tabRow: css`
    height: 50px;
    display: flex;
    justify-content: center;
  `,
  positionWrapper: (turn: RedOrBlue, expanded: boolean) => css`
    position: fixed;
    width: 100%;
    transition: opacity ease-in-out 200ms;
    ${turn === "red" ? "bottom: 0px;" : "top: 0px;"}
    opacity: ${expanded ? "1" : "0.3"};
    &:hover {
      opacity: 1;
    }
  `,
  outerPlayAreaWrapper: (turn: RedOrBlue, expanded: boolean) => {
    const backgroundColor = turn === "red" ? colors.red : colors.blue;
    const borderRadius =
      turn === "red"
        ? `border-top-left-radius: ${radius}; border-top-right-radius: ${radius};`
        : `border-bottom-left-radius: ${radius}; border-bottom-right-radius: ${radius};`;
    return css`
      background-color: ${backgroundColor};
      width: 100%;
      height: ${expanded ? "300px" : "15vh"};
      transition: height ease-in-out 200ms;
      ${borderRadius}
    `;
  },
  innerPlayAreaWrapper: css`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
  `,
  diceWrapper: (expanded: boolean) => css`
    display: flex;
    flex-direction: ${expanded ? "column" : "row"};
    height: ${expanded ? "200px" : "15vh"};
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: height ease-in-out 200ms;
  `,
};
