import React, { ReactNode } from "react";
import styles from "./TitleText.module.css";

interface TitleTextProps {
  title?: ReactNode; // Cambiado de string a ReactNode
  subtitle?: ReactNode;
  text?: string;
}

const TitleText: React.FC<TitleTextProps> = ({ title, subtitle, text }) => {
  return (
    <div className={styles.TitleContainer}>
      <h2 className={styles.Title}>{title}</h2> {/* title ahora acepta JSX */}
      <h3 className={styles.Subtitle}>{subtitle}</h3>
      <p className={styles.Text}>{text}</p>
    </div>
  );
};

export default TitleText;
