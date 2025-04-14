import React from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Determinamos si el progreso es alto (cerca del 100%)
  const progressLabelClass = progress >= 95 ? styles.high : "";

  return (
    <div className={styles.progressBarContainer}>
      <div className={`${styles.IndicadorProgress} ${progressLabelClass}`}>
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
