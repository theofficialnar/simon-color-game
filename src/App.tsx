import { useEffect, useState } from "react";

import styles from "./App.module.css";
import { Pad, Colors } from "./components/Pad";
import { Score } from "./components/Score";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
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
    // Adds a new color when the player successfuly finishes their turn
    setTimeout(() => {
      if (
        isGameStarted &&
        turn === "gamemaster" &&
        correctPadOrder.length === userInput.length
      ) {
        setCorrectPadOrder([...correctPadOrder, generateRandomPad()]);
        setTurn("player");
        setUserInput([]);
      }
    }, 1000);
  }, [turn]);

  const startGame = () => {
    setCorrectPadOrder([...correctPadOrder, generateRandomPad()]);
    setTurn("player");
    setIsGameStarted(true);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>Simon Color Game!</h1>
      </header>
      <Pad
        onButtonPress={(color) => {
          if (userInput.length < correctPadOrder.length) {
            setUserInput([...userInput, color]);
          }
        }}
        activePads={correctPadOrder}
        enablePlayerInput={turn === "player"}
      />
      <Score
        onStartGame={startGame}
        disableStartButton={correctPadOrder?.length > 0}
      />
    </div>
  );
}

export default App;
