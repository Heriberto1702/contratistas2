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
  slidesToShow?: number; // Número de estructuras visibles al mismo tiempo
  autoplay?: boolean;
  autoplaySpeed?: number;
}

const DoubleCarousel: React.FC<DoubleCarouselProps> = ({
  banners,
  slidesToShow = 2, // Mostrar 2 estructuras por defecto
  autoplay = true,
  autoplaySpeed = 2000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Función para avanzar slidesToShow slides
  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + slidesToShow) % banners.length);
  }, [slidesToShow, banners.length]);

  // Función para retroceder slidesToShow slides
  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - slidesToShow + banners.length) % banners.length
    );
  }, [slidesToShow, banners.length]);

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
          transform: `translateX(-${(currentSlide / banners.length) * 100}%)`,
          transition: "transform 0.5s ease-in-out",
          width: `${(banners.length / slidesToShow) * 100}%`,
          height:`100%`
        }}
      >
        {banners.map((banner) => (
          <div
            className={styles.carouselSlide}
            key={banner.id}
            style={{ width: `${100}%` }}
          >
            <div className={styles.bannerItem}>
              <div className={styles.bannerContent} >
                <h3 className={styles.bannerTitle}>{banner.title}</h3>
                <p className={styles.bannerText}>{banner.text}</p>
                <Link href={banner.link} className={styles.bannerLink}>
                Ver más &#10095;
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
      <button className={styles.prevBtn} onClick={prevSlide}>
        &#10094;
      </button>
      <button className={styles.nextBtn} onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default DoubleCarousel;
