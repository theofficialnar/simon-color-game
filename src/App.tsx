import { useEffect, useState } from "react";

import styles from "./App.module.css";
import { Pad, Colors } from "./components/Pad";
import { Score } from "./components/Score";

function App() {
  const [activePad, setActivePad] = useState<Colors | null>(null);
  const [padOrder, setPadOrder] = useState<Colors[]>([
    "green",
    "green",
    "red",
    "blue",
    "red",
    "yellow",
    "green",
  ]);
  const [activePadIndex, setActivePadIndex] = useState(0);

  const generateRandomPad = (): Colors => {
    const Pads: Colors[] = ["yellow", "blue", "green", "red"];

    return Pads[Math.floor(Math.random() * Pads.length)];
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>Simon Color Game!</h1>
      </header>
      <Pad
        onButtonPress={() => {}}
        activePads={padOrder}
        activePad={activePad}
      />
      <Score />
    </div>
  );
}

export default App;
