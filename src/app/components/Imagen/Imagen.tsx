import React from "react";
import Image from "next/image";
import styles from "./Imagen.module.css";

interface ImageTextProps {
  title?: string;
  imageUrl?: string;
  alt:string;
  text?: string;
}

const ImageText: React.FC<ImageTextProps> = ({ title, imageUrl, alt,text }) => {
  return (
    <div className={styles.container}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {imageUrl && <Image width={100} height={100} src={imageUrl} alt={alt} className={styles.image} />}
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default ImageText;