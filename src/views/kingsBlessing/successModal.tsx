/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { useEffect, useCallback } from "react";
import { Portal } from "components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  isOpen: boolean;
  close: () => void;
}

const timer = 10;
let timeout: NodeJS.Timeout | null = null;

export default function SuccessModal({ isOpen, close }: Props) {
  const closeCallback = useCallback(() => {
    if (isOpen) {
      close();
    }
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      timeout = setTimeout(() => {
        timeout = null;
        closeCallback();
      }, timer * 1000);
    } else {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    }
  }, [isOpen, closeCallback]);

  if (!isOpen) return null;
  return (
    <Portal>
      <div onClick={closeCallback} css={styles.background}>
        <div css={styles.card}>
          <div onClick={closeCallback} css={styles.cardTop}>
            <FontAwesomeIcon onClick={closeCallback} color="hsl(261, 60%, 39%)" icon={["fad", "times"]} size="2x" />
          </div>
          <div css={styles.cardBody}>
            <div>You're a whole lot of awesome</div>
          </div>
          <div css={styles.progressBar}>
            <div css={styles.progressBarColors} />
          </div>
        </div>
      </div>
    </Portal>
  );
}

const slide = keyframes`
    0% {
        transform: translate(0%);
        background-position: 0% 0%;
    }

    100% {
        transform: translate(-100%);
        background-position: 400% 0%;
    }
`;

const padding = "20px";
const borderRadius = "3px";
const styles = {
  background: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: absolute;
    left: 0;
    top: 0;
  `,
  card: css`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: ${borderRadius};
    min-width: 50vw;
    min-height: 30vh;
    z-index: 10;
    box-shadow: 0 1px 5px rgba(0, 3, 10, 0.1), 0 4px 5px -3px rgba(0, 3, 10, 0.24);
  `,
  cardTop: css`
    display: flex;
    justify-content: flex-end;
    padding: ${padding} ${padding} 0 ${padding};
    font-family: sans-serif;
    height: 40px;
    flex: 0 0 auto;
  `,
  cardBody: css`
    padding: ${padding};
    font-size: 2.4rem;
    font-family: sans-serif;
    display: flex;
    align-items: center;
    height: 100%;
    flex: 1 0 auto;
  `,
  progressBar: css`
    width: 100%;
    height: 8px;
    overflow: hidden;
    border-radius: ${borderRadius};
  `,
  progressBarColors: css`
    width: 100%;
    height: 8px;
    border-radius: ${borderRadius};
    // background: linear-gradient(90deg, red 0%, yellow 15%, lime 30%, cyan 50%, blue 65%, magenta 80%, red 100%);
    background: linear-gradient(
      90deg,
      hsl(0, 0%, 100%) 0%,
      hsl(260, 100%, 84%) 10%,
      hsl(264, 54%, 61%) 20%,
      hsl(269, 99%, 61%) 30%,
      hsl(260, 98%, 59%) 40%,
      hsl(261, 60%, 39%) 50%,
      hsl(262, 49%, 36%) 60%,
      hsl(261, 50%, 24%) 70%,
      hsl(269, 99%, 61%) 80%,
      hsl(264, 54%, 61%) 90%,
      hsl(0, 0%, 100%) 100%
    );
    background-size: 200%;
    animation: ${slide} ${timer}s linear;
  `,
};
