/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Circle, { Slice } from "components/circle";
import { useFieldData } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "theme";
import { RedOrBlue, FieldType } from "redux/slices/kingsBlessing/selection";

const buttonStyle = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 30px;
`;

interface FieldSelectionProps {
  player: RedOrBlue;
  field: FieldType;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export default function FieldSelection({ player, field, activeIndex, setActiveIndex }: FieldSelectionProps) {
  const { turn, fieldData } = useFieldData(player, field);
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        padding: 0 5px;
      `}
    >
      <div
        css={buttonStyle}
        onClick={() => {
          setActiveIndex(activeIndex - 1);
        }}
      >
        <FontAwesomeIcon
          css={css`
            padding-right: 2px;
          `}
          color={colors.purple}
          icon={["fad", "angle-left"]}
          size="lg"
        />
      </div>
      {fieldData.map((selection, i) => (
        <Circle
          style={{ border: i === activeIndex ? "2px solid purple" : "", borderRadius: 30, width: 15, height: 15 }}
          data={fieldData}
          turn={turn}
          key={i}
          player={player}
        >
          {selection.map((_, j) => (
            <Slice
              onClick={() => {
                setActiveIndex(i);
              }}
              access={[i, j]}
              key={`${i}-${j}`}
              percent={1 / selection.length}
            />
          ))}
        </Circle>
      ))}
      <div
        css={buttonStyle}
        onClick={() => {
          setActiveIndex(activeIndex + 1);
        }}
      >
        <FontAwesomeIcon
          css={css`
            padding-left: 2px;
          `}
          color={colors.purple}
          icon={["fad", "angle-right"]}
          size="lg"
        />
      </div>
    </div>
  );
}
