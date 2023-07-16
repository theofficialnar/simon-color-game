import { useEffect, useState } from "react";

import styles from "./App.module.css";
import { Pad, Colors } from "./components/Pad";
import { Score } from "./components/Score";

function App() {
  const [padOrder, setPadOrder] = useState<Colors[]>([]);

  const generateRandomPad = (): Colors => {
    const Pads: Colors[] = ["yellow", "blue", "green", "red"];

    return Pads[Math.floor(Math.random() * Pads.length)];
  };

  const startGame = () => {
    setPadOrder([...padOrder, generateRandomPad()]);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>Simon Color Game!</h1>
      </header>
      <Pad onButtonPress={() => {}} activePads={padOrder} />
      <Score onStartGame={startGame} />
    </div>
  );
}

export default App;
