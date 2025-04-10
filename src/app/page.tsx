import React from "react";
import BannerSlidernew from "@/app/components/BannerSlidernew/BannerSlidernew";
import DoubleCarousel from "@/app/components/DoubleCarusel/DoubleCarousel";
import SimpleCard from "@/app/components/SimpleCard/SimpleCard";
import TitleText from "@/app/components/Text/TitleText";
import Banner from "./components/Banner/Banner";
import BannerDocumentos from "./components/BannerDocumentos/Bannerdoc";
import NavBar from "./components/navbar/NavBar";
import TextoImagen from "./components/TextoImagen/texto-imagen";
import TextoImagenIzquierda from "./components/TextoImagenIzquierda/texto-imagenizquierda";
import Beneficios from "./components/Beneficios/Beneficios";

const Page = () => {
  const images = ["/banner.png", "/banner2.png"];
  return (
    <>
      <NavBar />
      {/* Carrusel de Banner con intervalos automáticos */}
      <BannerSlidernew images={images} interval={3000} />

      {/* Título de bienvenida */}
      <TitleText
        title={<>¡Bienvenido a nuestro Club del Contratista!</>}
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
          buttonText="Ver más ❯ "
          imageUrl="/construccion.png"
          buttonUrl="/galeria"
          altText="Imagen representativa"
        />
      </div>

      {/* Título adicional */}
      <TitleText subtitle="Descubre cómo alcanzar tu siguiente categoría" />
      <div className="simpleCards">
        <SimpleCard
          imageSrc="/oro.png"
          altText="Contratista Oro"
          text="CONTRATISTA ORO"
          linkUrl="/beneficios"
          linkText="Ver beneficios ❯"
        />
        <SimpleCard
          imageSrc="/plata.png"
          altText="Contratista Plata"
          text="CONTRATISTA PLATA"
          linkUrl="/beneficios"
          linkText="Ver beneficios ❯"
        />
      </div>

      <TitleText subtitle="Conoce algunos de los beneficios del Club Contratistas" />
      <Beneficios/>

      {/* Banner de evento */}
      <Banner
        imageUrl="/evento.png"
        linkUrl="/academia/evento/14"
        altText="Ejemplo de imagen"
        width={1224}
        height={317}
      />

      {/* Academia*/}
      <div>
        <TextoImagenIzquierda
          title="ACADEMIA"
          text="El club de Contratista te brinda un espacio para que puedas capacitarte online, donde adquirirás nuevas tecnicas e innovaciones, asi mismo te facilita información de todos loe eventos donde podrás asistir y reservar tu cupo."
          buttonText="Ver más ❯"
          imageUrl="/contratistaacademia.png"
          altText="Imagen academia"
          buttonUrl="/academia" // Aquí defines la URL a la que llevará el botón
        />
      </div>

      {/* Carrusel de doble */}
    
      <DoubleCarousel/>

      {/* Banner de evento */}
      <TitleText
        subtitle={
          <>
            Te brindamos recursos que te ayudarán en tus proyectos. <br />
            Utilice estos documentos para sus labores, entregas y proyectos en
            general.
          </>
        }
      />

      <BannerDocumentos
        imageUrl="/bannerdocumentos.png"
        linkUrl="/documentosutiles"
        altText="Ejemplo de imagen"
        width={1224}
        height={317}
      />

      <TitleText subtitle="Disfrute de un mundo de recursos valiosos a tu alcance!" />

      {/* Sección de beneficios (vacía por ahora) */}
      <section id="beneficios"></section>
    </>
  );
};

export default Page;
