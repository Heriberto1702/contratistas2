"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./DoubleCarousel.module.css";
import Link from "next/link";

interface Banner {
  id: number;
  image: string;
  title: string;
  text: string;
  link: string;
}

interface DoubleCarouselProps {
  banners: Banner[];
  slidesToShow?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

const DoubleCarousel: React.FC<DoubleCarouselProps> = ({
  banners,
  slidesToShow = 2,
  autoplay = true,
  autoplaySpeed = 2000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(slidesToShow);
  const totalSlides = banners.length;
  const infiniteBanners = [...banners, ...banners]; // Duplicamos las tarjetas para un efecto infinito

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  }, [totalSlides]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(nextSlide, autoplaySpeed);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplaySpeed, nextSlide]);

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.carouselTrack}
        style={{
          transform: `translateX(-${(currentSlide * 100) / slidesToShow}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {infiniteBanners.map((banner, index) => (
          <div
            className={styles.carouselSlide}
            key={index}
            style={{ width: `calc(100% / ${slidesToShow} - 5px)` }}
          >
            <div className={styles.bannerItem}>
              <div className={styles.bannerContent}>
                <h3 className={styles.bannerTitle}>{banner.title}</h3>
                <p className={styles.bannerText}>{banner.text}</p>
                <Link href={banner.link} className={styles.bannerLink}>
                  Ver curso &#10095;
                </Link>
              </div>
              <Image
                width={591}
                height={317}
                src={banner.image}
                alt={banner.text}
                className={styles.bannerImage}
              />
            </div>
          </div>
        ))}
      </div>
      <button className={styles.prevBtn} onClick={prevSlide}>&#10094;</button>
      <button className={styles.nextBtn} onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default DoubleCarousel;
