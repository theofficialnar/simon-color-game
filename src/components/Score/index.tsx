import { FC } from "react";

interface Props {
  onStartGame: () => void;
}
export const Score: FC<Readonly<Props>> = ({ onStartGame }) => {
  return (
    <div>
      Score: 0<button onClick={onStartGame}>Start Game</button>
    </div>
  );
};
