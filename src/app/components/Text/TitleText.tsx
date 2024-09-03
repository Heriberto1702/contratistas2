import React from "react";
import styles from "./TitleText.module.css";

interface TitleTextProps {
  title?: string;
  subtitle?:string;
  text?: string;
}

const TitleText: React.FC<TitleTextProps> = ({ title, subtitle, text }) => {
  return (
    <div className={styles.TitleContainer}>
      <h2 className={styles.Title}>{title}</h2>
      <h3 className={styles.Subtitle}>{subtitle}</h3>
      <p className={styles.Text}>{text}</p>
    </div>
  );
};

export default TitleText;