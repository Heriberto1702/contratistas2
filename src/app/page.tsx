import React from "react";
import BannerSlidernew from "@/app/components/BannerSlidernew/BannerSlidernew";
import Cards from "@/app/components/Cards/Cards";
import DoubleCarousel from "@/app/components/DoubleCarusel/DoubleCarousel";
import SimpleCard from "@/app/components/SimpleCard/SimpleCard";
import TitleText from "@/app/components/Text/TitleText";
import Banner from "./components/Banner/Banner";
import NavBar from "./components/navbar/NavBar";
import TextoImagen from "./components/TextoImagen/texto-imagen";

const Page = () => {
  const images = ["/banner.png", "/banner.png"];
  const banners = [
    {
      id: 1,
      image: "/curso1.png",
      title: "Instalaciones eléctricas básicas domiciliarias",
      text: "Miércoles 08 de Enero 2025 Inicio: 07:00 am ",
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
      {/* Carrusel de Banner con intervalos automáticos */}
      <BannerSlidernew images={images} interval={3000} />
    
      {/* Título de bienvenida */}
      <TitleText
 title={
  <>
    Bienvenido a nuestro Club del Contratista
  </>
}
  subtitle={
  
  <>
    Conozca nuestro mundo de beneficios por segmento y<br />
    sigamos creciendo juntos
  </>
  }
  
/>
      
   {/* Texto con Imagen */}
   <div>
      <TextoImagen
        title="¡Hoy más que nunca somos socios!"
        text="CLUB de Contratista lleva 05 años entregando múltiples beneficios a los profesionales de la construcción, aportando con herramientas reales para que miles de maestros de obra puedan desarrollar sus proyectos."
        buttonText="Ver más >"
        imageUrl="/construccion.png"
        altText="Imagen representativa"
      />
    </div>

     

      {/* Tarjetas simples */}
      <div className="simpleCards">
        <SimpleCard
          imageSrc="/contratista-oro.png"
          altText="Ejemplo 2"
          text="CONTRATISTA ORO"
          linkUrl="/beneficios"
          linkText="Ver beneficios >"
        />
        <SimpleCard
          imageSrc="/contratista-plata.png"
          altText="Ejemplo 2"
          text="CONTRATISTA PLATA"
          linkUrl="/beneficios"
          linkText="Ver beneficios >"
        />
      </div>

      {/* Banner de evento */}
      <Banner
        imageUrl="/evento.png"
        linkUrl="/academia/evento/14"
        altText="Ejemplo de imagen"
        width={1224}
        height={317}
      />
      
      {/* Título adicional */}
      <TitleText subtitle="Descubre cómo alcanzar tu siguiente categoría y beneficios" />
      <Cards />

      {/* Carrusel de doble */}
      <TitleText subtitle="Conoce lo nuevo en capacitación" />
      <DoubleCarousel
        banners={banners}
        slidesToShow={2} // Mostrar 2 estructuras por slide
        autoplay={true} // Auto-play activado
        autoplaySpeed={5000} // Velocidad de auto-play en milisegundos
      />
      
      {/* Sección de beneficios (vacía por ahora) */}
      <section id="beneficios"></section>
    </>
  );
};

export default Page;
