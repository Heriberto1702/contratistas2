import React, { ReactNode } from "react";
import styles from "./TitleText.module.css";

interface TitleTextProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  text?: string;
}

const TitleText: React.FC<TitleTextProps> = ({ title, subtitle, text }) => {
  return (
    <div className={styles.TitleContainer}>
      <h2 className={styles.Title}>{title}</h2>
      <h3 className={styles.Subtitle}>{subtitle}</h3>
      {/* Línea amarilla debajo del subtitle */}
      <div className={styles.Line}></div>
      <p className={styles.Text}>{text}</p>
    </div>
  );
};

export default TitleText;
