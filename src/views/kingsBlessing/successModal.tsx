/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback } from "react";
import { Portal } from "components";
import { RedOrBlue } from "redux/slices/kingsBlessing/selection";
import { Button } from "atoms";
import { newGame } from "redux/slices/kingsBlessing/actions";
import { useDispatch } from "react-redux";

interface Props {
  isOpen: boolean;
  winner: RedOrBlue;
}

export default function SuccessModal({ isOpen, winner }: Props) {
  const dispatch = useDispatch();

  if (!isOpen) return null;
  return (
    <Portal>
      <div css={background}>
        <div css={card}>
          <div css={cardBody}>
            <div>You're a whole lot of awesome</div>
            <div>You win {winner}!</div>
            <Button
              onClick={() => {
                dispatch(newGame());
              }}
            >
              New Game
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

const padding = "20px";
const borderRadius = "3px";

const background = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
`;

const card = css`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: ${borderRadius};
  min-width: 50vw;
  min-height: 30vh;
  z-index: 10;
  box-shadow: 0 1px 5px rgba(0, 3, 10, 0.1), 0 4px 5px -3px rgba(0, 3, 10, 0.24);
`;

const cardBody = css`
  padding: ${padding};
  font-size: 2.4rem;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  flex: 1 0 auto;
  line-height: 2em;
`;
