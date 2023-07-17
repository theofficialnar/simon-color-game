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
  onButtonPress: (color: Colors) => void;
  activePads: Colors[];
  enablePlayerInput: boolean;
}
export const Pad: FC<Readonly<Props>> = ({
  activePads,
  enablePlayerInput,
  onButtonPress,
}) => {
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
      if (activeIndex < activePads.length) {
        setActiveIndex(activeIndex + 1);
      }
    }, 1000);

    return () => {
      clearTimeout(addTimerId);
      clearTimeout(removeTimerId);
    };
  }, [activePads, activeIndex]);

  useEffect(() => {
    if (!enablePlayerInput) {
      setActiveIndex(0);
    }
  }, [enablePlayerInput]);

  const enabled = enablePlayerInput && activeIndex === activePads?.length;

  return (
    <div className={styles.padContainer}>
      <div className={styles.centerCircle}></div>
      {BUTTONS.map((button) => (
        <div
          id={button.color}
          key={button.color}
          className={`${styles.pad} ${styles[button.color]} ${
            !enabled && styles.disabled
          }`}
          onClick={() => {
            enabled && onButtonPress(button.color);
          }}
        ></div>
      ))}
    </div>
  );
};
