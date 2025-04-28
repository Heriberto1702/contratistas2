"use client";

import React from "react";
import Image from "next/image";
import styles from "./BannerStatic.module.css"; // Te recomiendo cambiar también el nombre del CSS para ser más prolijo

interface BannerStaticProps {
  images: string[]; // array de imágenes, mostramos solo la primera
}

const BannerStatic: React.FC<BannerStaticProps> = ({ images }) => {
  if (images.length === 0) return null; // seguridad: si no hay imágenes, no renderizamos nada

  return (
    <div className={styles.slider}>
      <div className={styles.slide}>
        <Image
          src={images[0]} // solo mostramos la primera imagen
          alt="Banner principal"
          fill
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default BannerStatic;
