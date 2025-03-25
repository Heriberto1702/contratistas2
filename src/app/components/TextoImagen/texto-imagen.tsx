import React from "react";
import Image from "next/image";
import styles from "./TextImageSection.module.css";

interface TextImageSectionProps {
  title: string;
  text: string;
  buttonText: string;
  buttonUrl: string; // Nuevo campo para la URL
  imageUrl: string;
  altText: string;
}

const TextImageSection: React.FC<TextImageSectionProps> = ({
  title,
  text,
  buttonText,
  buttonUrl,
  imageUrl,
  altText,
}) => {
  return (
    <div className={styles.container}>
      {/* Columna de texto */}
      <div className={styles.textColumn}>
      <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
        <a href={buttonUrl} className={styles.button}>
          {buttonText}
        </a>
      </div>

      {/* Columna de imagen */}
      <div className={styles.imageColumn}>
        <Image src={imageUrl} alt={altText} width={500} height={300} className={styles.image} />
      </div>
    </div>
  );
};

export default TextImageSection;
