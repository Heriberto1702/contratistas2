import React from "react";
import Image from "next/image";
import styles from "./SimpleCard.module.css";

interface CardData {
  imageSrc: string;
  altText: string;
  text: string;
  linkUrl: string;
  linkText: string;
  rightImageSrc: string;
}

interface SimpleCardProps {
  cards: CardData[];
}

const SimpleCard: React.FC<SimpleCardProps> = ({ cards }) => {
  return (
    <div className={styles.cardsWrapper}>
      {cards.map((card, index) => (
        <div className={styles.simpleCard} key={index}>
          <div className={styles.coinContainer}>
            <div className={styles.coin}>
              <div className={styles.front}>
                <Image
                  src={card.imageSrc}
                  alt={card.altText}
                  width={350}
                  height={350}
                  className={styles.image}
                />
              </div>
              <div className={styles.back}>
                <Image
                  src={card.imageSrc}
                  alt={card.altText}
                  width={350}
                  height={350}
                  className={styles.image}
                />
              </div>
            </div>

            <div className={styles.textContainer}>
              <h3 className={styles.cardTitle}>{card.text}</h3>
              <a href={card.linkUrl} className={styles.btnYellow}>
                {card.linkText}
              </a>
            </div>
          </div>

          <div className={styles.imageRight}>
            <Image 
              src={card.rightImageSrc}
              alt={card.altText}
              width={250}
              height={250}
              className={styles.imageSlideUp}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimpleCard;
