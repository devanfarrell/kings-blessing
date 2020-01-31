/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectGoldDie } from "redux/slices/kingsBlessing/state";

function Dot() {
  return <div css={styles.dot} />;
}

function InternalDots({ value }) {
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

function Dots({ value }) {
  return (
    <div css={styles.wrapper(value == null)}>
      <InternalDots value={value} />
    </div>
  );
}

function Row(props) {
  return (
    <div css={styles.row} style={props.style}>
      {props.children}
    </div>
  );
}

export default function GoldDie() {
  const value = useSelector(selectGoldDie);
  return <Dots value={value} />;
}

const styles = {
  wrapper: (uninitialized: boolean) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
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
    border-radius: 5px;
    width: 75px;
    height: 75px;
    flex-direction: column;
    ${uninitialized
      ? `
        opacity: 0.6
    `
      : ``}
  `,
  row: css`
    height: 25px;
    display: flex;
    width: 100%;
  `,
  dot: css`
    margin: 5px;
    width: 15px;
    height: 15px;
    border-radius: 10px;
    background-color: #939498;
    box-shadow: 0px 0px 13px #231f20 inset;
  `
};
