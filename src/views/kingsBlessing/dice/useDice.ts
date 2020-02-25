import { useSelector, useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import { selectHaveRerolled, rerollGoldDie, rerollPurpleDie } from "redux/slices/kingsBlessing/state";
import { selectCanRedRerollDice, selectCanBlueRerollDice } from "redux/slices/kingsBlessing/selection";
import {
  selectTurn,
  selectPurpleDie,
  selectGoldDie,
  rollDice as rollDiceAction,
  GoldDie,
  PurpleDie,
} from "redux/slices/kingsBlessing/state";

type DiceBooleans = { gold: boolean; purple: boolean };
type RedOrBlue = "red" | "blue";
type UseDiceResponse = {
  turn: RedOrBlue;
  goldDie: GoldDie;
  purpleDie: PurpleDie;
  canRerollPurple: boolean;
  canRerollGold: boolean;
  rollDice: () => void;
  rerollGold: () => void;
  rerollPurple: () => void;
};

export default function useDice(): UseDiceResponse {
  const dispatch = useDispatch();
  const turn: RedOrBlue = useSelector(selectTurn);
  const goldDie: GoldDie = useSelector(selectGoldDie);
  const purpleDie: PurpleDie = useSelector(selectPurpleDie);
  const haveRerolled: DiceBooleans = useSelector(selectHaveRerolled);
  const redCanReroll: DiceBooleans = useSelector(selectCanRedRerollDice);
  const blueCanReroll: DiceBooleans = useSelector(selectCanBlueRerollDice);
  const currentRerollCapabilities = turn === "red" ? redCanReroll : blueCanReroll;

  const canRerollPurple = !haveRerolled.purple && currentRerollCapabilities.purple;
  const canRerollGold = !haveRerolled.gold && currentRerollCapabilities.gold;

  const rollDice = useCallback(() => {
    dispatch(rollDiceAction());
  }, [dispatch]);

  const rerollPurple = useCallback(() => {
    dispatch(rerollPurpleDie());
  }, [dispatch]);

  const rerollGold = useCallback(() => {
    dispatch(rerollGoldDie());
  }, [dispatch]);

  const memo: UseDiceResponse = useMemo((): UseDiceResponse => {
    return { turn, goldDie, purpleDie, rollDice, canRerollPurple, canRerollGold, rerollPurple, rerollGold };
  }, [turn, goldDie, purpleDie, rollDice, canRerollGold, canRerollPurple, rerollPurple, rerollGold]);

  return memo;
}
