// src/components/BannerCarousel.tsx
"use client";
import React from "react";
import Slider from "react-slick";
import styles from "./BannerCarousel.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

interface BannerCarouselProps {
  images: string[];
  altText?: string;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({
  images,
  altText = "Banner image",
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className={styles.slide}>
            <Image
              width={800}
              height={400}
              src={image}
              alt={altText}
              className={styles.bannerImage}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
