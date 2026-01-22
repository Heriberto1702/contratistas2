"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./BannerSlidernew.module.css";

interface BannerSlidernewProps {
  images: string[];
  interval?: number;
}

const BannerSlidernew: React.FC<BannerSlidernewProps> = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  useEffect(() => {
    const autoPlay = setInterval(goToNext, interval, goToPrevious);
    return () => clearInterval(autoPlay);
  }, [goToNext, interval, goToPrevious]);

  return (
    <div className={styles.slider}>
    
      <div className={styles.slides} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.slide}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className={styles.image}
            />
          </div>
        ))}
      </div>
  
      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlidernew;