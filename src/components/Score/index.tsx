import { FC } from "react";

interface Props {
  onStartGame: () => void;
  disableStartButton: boolean;
  score: number;
  isGameOver: boolean;
}
export const Score: FC<Readonly<Props>> = ({
  onStartGame,
  disableStartButton,
  score,
  isGameOver,
}) => {
  return (
    <div>
      {isGameOver && <h1>Game over!</h1>}
      Score: {score}
      {!disableStartButton && <button onClick={onStartGame}>Start Game</button>}
    </div>
  );
};
