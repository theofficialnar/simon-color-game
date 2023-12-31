import { useEffect, useState } from "react";

import styles from "./App.module.css";
import { Pad, Colors } from "./components/Pad";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [correctPadOrder, setCorrectPadOrder] = useState<Colors[]>([]);
  const [userInput, setUserInput] = useState<Colors[]>([]);
  const [turn, setTurn] = useState<"player" | "gamemaster">("gamemaster");

  const generateRandomPad = (): Colors => {
    const Pads: Colors[] = ["yellow", "blue", "green", "red"];

    return Pads[Math.floor(Math.random() * Pads.length)];
  };

  useEffect(() => {
    // Check if player turn is to be over
    if (correctPadOrder.length === userInput.length && turn === "player") {
      setTurn("gamemaster");
    }
  }, [userInput]);

  useEffect(() => {
    if (
      !isGameStarted ||
      turn !== "gamemaster" ||
      correctPadOrder.length !== userInput.length
    ) {
      return;
    }

    if (JSON.stringify(correctPadOrder) !== JSON.stringify(userInput)) {
      setIsGameStarted(false);
      setCorrectPadOrder([]);
      setUserInput([]);
      setTurn("gamemaster");
      setScore(0);
      setIsGameOver(true);
      return;
    }

    setScore(score + 1);

    // Adds a new color when the player successfuly finishes their turn
    setTimeout(() => {
      setCorrectPadOrder([...correctPadOrder, generateRandomPad()]);
      setTurn("player");
      setUserInput([]);
    }, 1000);
  }, [turn]);

  const startGame = () => {
    setCorrectPadOrder([...correctPadOrder, generateRandomPad()]);
    setTurn("player");
    setIsGameStarted(true);
    setIsGameOver(false);
  };

  return (
    <main>
      <div className={styles.wrapper}>
        <header>
          <h1>Let's Play Simon!</h1>
          <h2>Level: {score}</h2>
          {isGameOver && <h2 className={styles.gameOver}>Game Over!</h2>}
        </header>
        <Pad
          onButtonPress={(color) => {
            if (userInput.length < correctPadOrder.length) {
              setUserInput([...userInput, color]);
            }
          }}
          activePads={correctPadOrder}
          enablePlayerInput={turn === "player"}
          onStartGame={startGame}
          enableStartButton={!isGameStarted}
        />
      </div>
      <footer>
        Made by Nar Cuenca |&nbsp;
        <a
          href="https://github.com/theofficialnar/simon-color-game"
          rel="noopener noreferrer"
          target="_blank"
        >
          Github
        </a>
      </footer>
    </main>
  );
}

export default App;
