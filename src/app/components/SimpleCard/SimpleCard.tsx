import React from "react";
import Image from "next/image";
import styles from "./SimpleCard.module.css";

interface SimpleCardProps {
  imageSrc: string;
  altText: string;
  text: string;
  linkUrl: string;
  linkText: string;
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  imageSrc,
  altText,
  text,
  linkUrl,
  linkText,
}) => {
  return (
    <div className={styles.simpleCard}>
      <Image
        width={350}
        height={350}
        src={imageSrc}
        alt={altText}
        className={styles.image}
      />
      <div className={styles.textContainer}>
        <h3 className={styles.cardTitle}>{text}</h3>
        <a href={linkUrl} className={styles.btnYellow}>
          {linkText}
        </a>
      </div>
    </div>
  );
};

export default SimpleCard;
