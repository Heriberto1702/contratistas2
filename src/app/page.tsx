import React from "react";
import BannerSlidernew from "@/app/components/BannerSlidernew/BannerSlidernew";
import Cards from '@/app/components/Cards'
import TitleWithImage from '@/app/components/TitleWithImage';
import styles from '@/app/components/TitleWithImage.module.css';

import SimpleCard from "@/app/components/SimpleCard";
import TitleText from "./components/Text/TitleText";
const Page = () => {
  const images = ["/banner.png","/banner.png"];
  return ( 
    <>
    <BannerSlidernew images={images} interval={3000} />
    <>
        <TitleWithImage
          imageSrc="/evento.png"
          imageAlt="Club de contratista"
          imageWidth={100}
          imageHeight={100}
          imageClassName={`${styles.customImageClass} ${styles.imageDesktop}`}
          imageLink="https://example.com"
        />
        <TitleWithImage
          imageSrc="/evento.png"
          imageAlt="Club de contratista"
          imageWidth={800}
          imageHeight={400}
          imageClassName={`${styles.customImageClass} ${styles.imageTablet}`}
          imageLink="https://example.com"
        />
        <TitleWithImage
          imageSrc="/evento.png"
          imageAlt="Club de contratista"
          imageWidth={800}
          imageHeight={400}
          imageClassName={`${styles.customImageClass} ${styles.imageMobile}`}
          imageLink="https://example.com"
        />
      </>
      <TitleText title="Bienvenido a nuestro CLUB PRO" subtitle="Conozca nuestro mundo de beneficios por segmento y sigamos creciendo juntos" />
      <TitleWithImage
        imageSrc="/clubpro.png"
        imageAlt="Club de contratista"
        imageWidth={800}
        imageHeight={400}
        className={styles.titleWithImageContainer}
        imageClassName={styles.customImageClass}
        imageLink="https://example.com"
      />
      <div className="simpleCards">
        <SimpleCard
          imageSrc="/contratista-oro.png"
          altText="Ejemplo 2"
          text="Este es el segundo ejemplo de texto."
          linkUrl="https://www.example.com/2"
          linkText="Ver beneficios >"
        />
        <SimpleCard
          imageSrc="/contratista-plata.png"
          altText="Ejemplo 2"
          text="Este es el segundo ejemplo de texto."
          linkUrl="https://www.example.com/2"
          linkText="Ver beneficios >"
        />
      </div>
      <TitleText 
        subtitle="Descubre cómo alcanzar tu siguiente categoría y beneficios"
      />
      <Cards />

      <TitleText 
        subtitle="Conoce lo nuevo en capacitación"
      />
      <>
        <TitleWithImage
          imageSrc="/canjear.png"
          imageAlt="Club de contratista"
          imageWidth={800}
          imageHeight={400}
          imageClassName={`${styles.customImageClass} ${styles.imageDesktop}`}
          imageLink="https://example.com"
        />
        <TitleWithImage
          imageSrc="/canjear.png"
          imageAlt="Club de contratista"
          imageWidth={800}
          imageHeight={400}
          imageClassName={`${styles.customImageClass} ${styles.imageTablet}`}
          imageLink="https://example.com"
        />
        <TitleWithImage
          imageSrc="/canjear.png"
          imageAlt="Club de contratista"
          imageWidth={800}
          imageHeight={400}
          imageClassName={`${styles.customImageClass} ${styles.imageMobile}`}
          imageLink="https://example.com"
        />
      </>
    </>
  );
};

export default Page;