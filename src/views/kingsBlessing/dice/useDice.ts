import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  selectTurn,
  selectPurpleDie,
  selectGoldDie,
  rollDice as rollDiceAction,
  GoldDie,
  PurpleDie
} from "redux/slices/kingsBlessing/state";

export default function useDice() {
  const dispatch = useDispatch();
  const turn: "red" | "blue" = useSelector(selectTurn);
  const goldDie: GoldDie = useSelector(selectGoldDie);
  const purpleDie: PurpleDie = useSelector(selectPurpleDie);
  const rollDice = useCallback(() => {
    dispatch(rollDiceAction());
  }, [dispatch]);
  return { turn, goldDie, purpleDie, rollDice };
}
