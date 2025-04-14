// components/ProgressBar/ProgressBar.tsx
import React from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.IndicadorProgress}>
        Progreso del curso: {progress}%
      </div>
      <div className={styles.progressBar2}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;