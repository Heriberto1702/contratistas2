import React from "react";
import BannerSlidernew from "@/app/components/BannerSlidernew/BannerSlidernew";
import Cards from "@/app/components/Cards/Cards";
import DoubleCarousel from "@/app/components/DoubleCarusel/DoubleCarousel";
import SimpleCard from "@/app/components/SimpleCard/SimpleCard";
import TitleText from "@/app/components/Text/TitleText";
import Banner from "./components/Banner/Banner";
import NavBar from "./components/navbar/NavBar";
import Beneficios from './components/Beneficios/Beneficios';

const Page = () => {
  const images = ["/banner.png", "/banner.png"];
  const banners = [
    {
      id: 1,
      image: "/curso1.png",
      title: "Instalaciones electricas básicas domiciliarias",
      text: "Miercoles 08 de Enero 2025 Inicio: 07:00 am ",
      link: "/academia/cursos/1",
    },

    {
      id: 2,
      image: "/curso2.png",
      title: "Capacitación Online Drytec",
      text: "Jueves 09 de Enero 2025 Inicio: 07:00 am",
      link: "/academia/cursos/2",
    },
  ];
  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />
      <Banner
        imageUrl="/evento.png"
        linkUrl="academia/evento/14"
        altText="Ejemplo de imagen"
        width={1224}
        height={317}
      />
      <TitleText
        title="Bienvenido a nuestro Club del Contratista"
        subtitle="Conozca nuestro mundo de beneficios por segmento y sigamos creciendo juntos"
      />
      <Banner
        imageUrl="/clubpro.png"
        linkUrl=" "
        altText="Ejemplo de imagen"
        width={1224}
        height={317}
      />
      <div className="simpleCards">
        <SimpleCard
          imageSrc="/contratista-oro.png"
          altText="Ejemplo 2"
          text="CONTRATISTA ORO "
          linkUrl="https://www.example.com"
          linkText="Ver beneficios >"
        />
        <SimpleCard
          imageSrc="/contratista-plata.png"
          altText="Ejemplo 2"
          text="CONTRATISTA PLATA"
          linkUrl="https://www.example.com"
          linkText="Ver beneficios >"
        />
      </div>
      <TitleText subtitle="Descubre cómo alcanzar tu siguiente categoría y beneficios" />
      <Cards />


      <TitleText subtitle="Conoce lo nuevo en capacitación" />
      <DoubleCarousel
        banners={banners}
        slidesToShow={2} // Mostrar 2 estructuras por slide
        autoplay={true} // Auto-play activado
        autoplaySpeed={5000} // Velocidad de auto-play en milisegundos
      />
      
      <section id="beneficios">
      <TitleText subtitle="Beneficios para Contratistas" />
      <Beneficios />
      </section>

      
    </>
  );
};

export default Page;
