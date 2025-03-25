import React from "react";
import styles from "./TextImageSection.module.css";

interface TextImageSectionProps {
  title: string;
  text: string;
  buttonText: string;
  imageUrl: string;
  altText: string;
}

const TextImageSection: React.FC<TextImageSectionProps> = ({
  title,
  text,
  buttonText,
  imageUrl,
  altText,
}) => {
  return (
    <div className={styles.container}>
      {/* Columna de texto */}
      <div className={styles.textColumn}>
      <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
        <button className={styles.button}>{buttonText}</button>
      </div>

      {/* Columna de imagen */}
      <div className={styles.imageColumn}>
        <img src={imageUrl} alt={altText} className={styles.image} />
      </div>
    </div>
  );
};

export default TextImageSection;
