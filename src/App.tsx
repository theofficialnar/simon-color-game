import { useEffect, useState } from "react";

import styles from "./App.module.css";
import { Pad, Colors } from "./components/Pad";
import { Score } from "./components/Score";

function App() {
  const [correctPadOrder, setCorrectPadOrder] = useState<Colors[]>([]);
  const [turn, setTurn] = useState<"player" | "gamemaster">("gamemaster");

  const generateRandomPad = (): Colors => {
    const Pads: Colors[] = ["yellow", "blue", "green", "red"];

    return Pads[Math.floor(Math.random() * Pads.length)];
  };

  const startGame = () => {
    setCorrectPadOrder([...correctPadOrder, generateRandomPad()]);
    setTurn("player");
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>Simon Color Game!</h1>
      </header>
      <Pad onButtonPress={() => {}} activePads={correctPadOrder} />
      <Score
        onStartGame={startGame}
        disableStartButton={correctPadOrder?.length > 0}
      />
    </div>
  );
}

export default App;
