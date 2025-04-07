import BannerSlidernew from "../components/BannerSlidernew/BannerSlidernew";
import Container from "../components/Container/Container";
import EventCalendar from "../components/EventCalendar/EventCalendar";
import ImageText from "../components/Imagen/Imagen";
import Documentos from "../components/DocumentosAcademy/Documentos";
import TitleText from "../components/Text/TitleText";
import React from "react";
import DoubleCarousel from "@/app/components/DoubleCarusel/DoubleCarousel";
import NavBar from "../components/navbar/NavBar";
import LinkComponent from "../components/LinkComponent/LinkComponent";

const Page = () => {
  const images = ["/banneracademia.png"];

  // Declaración de las cards con sus datos ajustados para el componente Documentos
  const cards = [
    {
      id: "1",
      title: "Como fidelizar a sus clientes",
      imageUrl: "/card1.png",
      url: "/academia/docpdf/1",
    },
    {
      id: "2",
      title: "Como armar un buen presupuesto",
      imageUrl: "/card2.png",
      url: "/academia/docpdf/2",
    },
    {
      id: "3",
      title: "Como formalizar su empresa",
      imageUrl: "/card3.png",
      url: "/academia/docpdf/3",
    },
  ];

  return (
    <>
      {/* Barra de navegación */}
      <NavBar />

      {/* Banner principal */}
      <BannerSlidernew images={images} interval={3000} />

      {/* Introducción */}
      <TitleText
        title="¿Qué es Academia para Contratistas?"
        text="Es una plataforma online de capacitación en la que solo por ser socio podrá aprender diversas técnicas y conocer nuevos productos e innovaciones para perfeccionar su trabajo."
      />

      <TitleText subtitle="¿Qué puede encontrar en nuestra Academia para Contratistas?" />
      <Container
        displayType="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="4rem"
      >
        <ImageText imageUrl="/tools.png" alt="" text="Talleres Prácticos" />
        <ImageText imageUrl="/play.png" alt="" text="Cápsula digital" />
        <ImageText
          imageUrl="/feriaregional.png"
          alt=""
          text="Ferias Regionales"
        />
      </Container>

      {/* Sección de cards documentos */}
      <TitleText subtitle="Documentos disponibles" />
      <Documentos modules={cards} />

      {/* Calendario de actividades */}
      <TitleText subtitle="Calendario de Actividades" />
      <EventCalendar />

      {/* Carrusel de doble */}
      <DoubleCarousel />
      <Container>
        <LinkComponent href="/academia/cursos" text="Ver más cursos ❯" />
      </Container>
    </>
  );
};

export default Page;
