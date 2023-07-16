import { FC } from "react";

interface Props {
  onStartGame: () => void;
  disableStartButton: boolean;
}
export const Score: FC<Readonly<Props>> = ({
  onStartGame,
  disableStartButton,
}) => {
  return (
    <div>
      Score: 0
      {!disableStartButton && <button onClick={onStartGame}>Start Game</button>}
    </div>
  );
};
