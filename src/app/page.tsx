import React from "react";
import BannerSlider from '@/app/components/BannerSlider';
import EventCalendar from '@/app/components/EventCalendar';
import Pdfviewer from "@/app/components/PdfViewer";
import Cards from '@/app/components/Cards'
import TitleWithImage from '@/app/components/TitleWithImage';
import styles from '@/app/components/TitleWithImage.module.css';
import TextCard from '@/app/components/TextCard';
import SimpleCard from "@/app/components/SimpleCard";
const Page = () => {
  return ( 
    <>
    <BannerSlider />
    <Pdfviewer url={"https://pdfobject.com/pdf/sample.pdf"} />
    <>
        <TitleWithImage
          imageSrc="/evento.png"
          imageAlt="Club de contratista"
          imageWidth={800}
          imageHeight={400}
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
      <TitleWithImage
        mainTitle="Bienvenido a nuestro CLUB PRO"
        subTitle="Conozca nuestro mundo de beneficios por segmento y sigamos creciendo juntos"
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
      <TextCard 
        title="Descubre cómo alcanzar tu siguiente categoría y beneficios"
      />
      <Cards />
      <EventCalendar />
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