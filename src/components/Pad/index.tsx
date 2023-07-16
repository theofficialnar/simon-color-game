import { FC, useEffect, useState } from "react";

import styles from "./index.module.css";

export type Colors = "blue" | "red" | "green" | "yellow";
interface Button {
  color: Colors;
}
const BUTTONS: Readonly<Button[]> = [
  {
    color: "green",
  },
  {
    color: "blue",
  },
  {
    color: "red",
  },
  {
    color: "yellow",
  },
];

interface Props {
  onButtonPress: () => void;
  activePads: Colors[];
}
export const Pad: FC<Readonly<Props>> = ({ activePads }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!activePads?.length) {
      return;
    }

    const element = document.getElementById(activePads[activeIndex]);
    const addTimerId = setTimeout(() => {
      element?.classList.add(styles.active);
    }, 500);
    const removeTimerId = setTimeout(() => {
      element?.classList.remove(styles.active);

      if (activePads.length < activeIndex) {
        setActiveIndex(activeIndex + 1);
      }
    }, 1000);

    return () => {
      clearTimeout(addTimerId);
      clearTimeout(removeTimerId);
    };
  }, [activePads, activeIndex]);

  return (
    <div className={styles.padContainer}>
      {BUTTONS.map((button) => (
        <div
          id={button.color}
          key={button.color}
          className={`${styles.pad} ${styles[button.color]}`}
        ></div>
      ))}
    </div>
  );
};
