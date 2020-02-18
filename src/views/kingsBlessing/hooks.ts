import { useCallback } from "react";
import { FieldType } from "redux/slices/kingsBlessing/selection";
import { useSelector, useDispatch } from "react-redux";
import { selectTurn } from "redux/slices/kingsBlessing/state";
import {
  selectBlueKing,
  selectBlueQueen,
  selectBlueField,
  updateBlue,
  selectRedKing,
  selectRedQueen,
  selectRedField,
  selectPresentationOrder,
  updateRed,
} from "redux/slices/kingsBlessing/selection";
import { kingsBlessingClickSound } from "audio";

export function useFieldData(player: "red" | "blue" = "red", field?: FieldType) {
  const dispatch = useDispatch();

  const turn = useSelector(selectTurn);
  const presentationOrder = useSelector(selectPresentationOrder);
  // red
  const redKingData = useSelector(selectRedKing);
  const redQueenData = useSelector(selectRedQueen);
  const redField = useSelector(selectRedField);
  // blue
  const blueKingData = useSelector(selectBlueKing);
  const blueQueenData = useSelector(selectBlueQueen);
  const blueField = useSelector(selectBlueField);

  const kingData = player === "red" ? redKingData : blueKingData;
  const queenData = player === "red" ? redQueenData : blueQueenData;

  const allFieldData = player === "red" ? redField : blueField;
  const fieldData = allFieldData[field];

  const sliceClickCallback = useCallback(
    field => access => {
      if (player === turn) {
        kingsBlessingClickSound.play();
        if (player === "red") {
          dispatch(
            updateRed({
              section: field,
              circleIndex: access[0],
              sliceIndex: access[1],
            })
          );
        } else if (player === "blue") {
          dispatch(
            updateBlue({
              section: field,
              circleIndex: access[0],
              sliceIndex: access[1],
            })
          );
        }
      }
    },
    [dispatch, player, turn]
  );

  return { turn, presentationOrder, kingData, queenData, fieldData, sliceClickCallback };
}
