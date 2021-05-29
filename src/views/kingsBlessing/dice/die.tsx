/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Fragment, CSSProperties, ReactChild } from "react";
import { GoldDie as IGoldDie, PurpleDie as IPurpleDie } from "redux/slices/kingsBlessing/state";
import useDice from "./useDice";

const Dot = () => <div css={dot} />;

interface InternalDotsProps {
  value: IGoldDie | IPurpleDie;
}

function InternalDots({ value }: InternalDotsProps) {
  switch (value) {
    case 1:
      return (
        <Fragment>
          <Row />
          <Row style={{ justifyContent: "center" }}>
            <Dot />
          </Row>
          <Row />
        </Fragment>
      );
    case 2:
      return (
        <Fragment>
          <Row style={{ justifyContent: "flex-start" }}>
            <Dot />
          </Row>
          <Row />
          <Row style={{ justifyContent: "flex-end" }}>
            <Dot />
          </Row>
        </Fragment>
      );
    case 3:
      return (
        <Fragment>
          <Row style={{ justifyContent: "flex-start" }}>
            <Dot />
          </Row>
          <Row style={{ justifyContent: "center" }}>
            <Dot />
          </Row>
          <Row style={{ justifyContent: "flex-end" }}>
            <Dot />
          </Row>
        </Fragment>
      );
    case 4:
      return (
        <Fragment>
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
          <Row />
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
        </Fragment>
      );
    case 5:
      return (
        <Fragment>
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
          <Row style={{ justifyContent: "center" }}>
            <Dot />
          </Row>
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
        </Fragment>
      );
    case 6:
      return (
        <Fragment>
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
        </Fragment>
      );
    default:
      return (
        <Fragment>
          <Row />
          <Row style={{ justifyContent: "center" }}>
            <Dot />
          </Row>
          <Row />
        </Fragment>
      );
  }
}

interface RowProps {
  style?: CSSProperties;
  children?: ReactChild | ReactChild[];
}

const Row = (props: RowProps) => <div css={row} {...props} />;

interface DieInterface {
  selected: boolean;
  onClick: () => void;
}

export function GoldDie({ selected, onClick }: DieInterface) {
  const { canRerollGold, goldDie: value } = useDice();
  return (
    <div onClick={onClick} css={border(!!value && canRerollGold, selected)}>
      <div css={[wrapper(value == null), goldWrapper]}>
        <InternalDots value={value} />
      </div>
    </div>
  );
}

export function PurpleDie({ selected, onClick }: DieInterface) {
  const { canRerollPurple, purpleDie: value } = useDice();
  return (
    <div onClick={onClick} css={border(!!value && canRerollPurple, selected)}>
      <div css={[wrapper(value == null), purpleWrapper]}>
        <div css={outset}>{value || 1}</div>
        <div css={inset}>{value || 1}</div>
      </div>
    </div>
  );
}

const inset = css`
  font: bold 50px arial, sans-serif;
  color: rgba(255, 255, 255, 0.85);
  line-height: 0px;
`;

const outset = css`
  font: bold 50px arial, sans-serif;
  color: transparent;
  text-shadow: -1px -1px 2px hsla(262, 50%, 24%, 0.8);
  line-height: 0px;
`;

const goldWrapper = css`
  background: radial-gradient(
      ellipse farthest-corner at right bottom,
      hsl(49, 99%, 61%) 0%,
      hsl(40, 98%, 59%) 8%,
      hsl(41, 60%, 39%) 30%,
      hsl(42, 49%, 36%) 40%,
      transparent 80%
    ),
    radial-gradient(
      ellipse farthest-corner at left top,
      hsl(0, 0%, 100%) 0%,
      hsl(60, 100%, 84%) 8%,
      hsl(44, 54%, 61%) 25%,
      hsl(41, 50%, 34%) 62.5%,
      hsl(42, 50%, 34%) 100%
    );
`;

const purpleWrapper = css`
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
`;

const border = (canReroll: boolean, selected: boolean) => {
  const opacity = !canReroll ? 0 : selected ? 0.9 : 0.5;
  return css`
    border-radius: 10px;
    border: solid 5px hsla(261, 50%, 24%, ${opacity});
    ${canReroll ? "cursor: pointer" : "cursor: not-allowed"};
  `;
};

const wrapper = (uninitialized: boolean) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 75px;
  height: 75px;
  font-size: 24px;
  font-weight: bold;
  flex-direction: column;
  ${uninitialized &&
  css`
    opacity: 0.6;
  `}
`;

const row = css`
  height: 25px;
  display: flex;
  width: 100%;
`;

const dot = css`
  margin: 5px;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  background-color: #939498;
  box-shadow: 0px 0px 13px #231f20 inset;
`;
