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
import styles from "../components/Container/Container.module.css"

const Page = () => {
  const images = ["/banneracademia.png"];

  // Declaración de las cards con sus datos ajustados para el componente Documentos
  const cards = [
    { id: '1', title: "Como fidelizar a sus clientes", imageUrl: '/card1.png', url: "/academia/docpdf/1" },
    { id: '2', title: "Como armar un buen presupuesto", imageUrl: '/card2.png', url: "/academia/docpdf/2" },
    { id: '3', title: "Como formalizar su empresa", imageUrl: '/card3.png', url: "/academia/docpdf/3" },
  ];

  const banners = [
    {
      id: 1,
      image: "/curso1.png",
      title: "Instalaciones eléctricas básicas domiciliarias",
      text: "Viernes 28 de Marzo 2025 Inicio: 07:00 am ",
      link: "/academia/cursos/1",
    },
    {
      id: 2,
      image: "/curso2.png",
      title: "Capacitación Online Drytec",
      text: "Martes 15 de Abril 2025 Inicio: 08:00 am",
      link: "/academia/cursos/2",
    },
    {
      id: 3,
      image: "/curso3.png",
      title: "Habilidades con pintura Lanco",
      text: "Jueves 17 de Abril 2025 Inicio: 09:00 am",
      link: "/academia/cursos/6",
    },
  ];

  /*
  const modulesData = [
    {
      title: "Instalaciones eléctricas básicas domiciliarias",
      imageUrl: "/curso1.png",
      logo: "/schneider.png",
      url: "academia/cursos/1",
      linkText: "Leer más >",
    },
    {
      title: "Capacitación Online Drytec",
      imageUrl: "/curso2.png",
      logo: "/drytec.png",
      url: "academia/cursos/2",
      linkText: "Leer más >",
    },
    {
      title: "Lo que debes saber sobre pintura.",
      imageUrl: "/curso3.png",
      logo: "/lanco.png",
      url: "academia/cursos/3",
      linkText: "Leer más >",
    },
  ];*/

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
        <ImageText imageUrl="/feriaregional.png" alt="" text="Ferias Regionales" />
      </Container>

      {/* Sección de cards documentos */}
      <TitleText subtitle="Documentos disponibles" />
      <Documentos modules={cards} />

      {/* Calendario de actividades */}
      <TitleText subtitle="Calendario de Actividades" />
      <EventCalendar />

      {/* Cursos destacados 
      <TitleText subtitle="Cursos Destacados" />*/}
      
      {/*<Container displayType="flex" flexDirection="row" justifyContent="center" alignItems="center" gap="1rem">
        <Modulo
          title="Instalaciones eléctricas básicas domiciliarias"
          imageUrl="/curso1.png"
          logo="/schneider.png"
          url="academia/cursos/1"
          linkText="Leer más >"
          title2="Capacitación Online Drytec"
          imageUrl2="/curso2.png"
          logo2="/drytec.png"
          url2="academia/cursos/2"
          linkText2="Leer más >"
          title3="Lo que debes saber sobre pintura."
          imageUrl3="/curso3.png"
          logo3="/lanco.png"
          url3="academia/cursos/3"
          linkText3="Leer más >"
        />
      </Container>
      */}
  {/* Carrusel de doble */}
  <TitleText subtitle="Conoce nuestros cursos destacados" />
      <DoubleCarousel
        banners={banners}
        slidesToShow={2} // Mostrar 2 estructuras por slide
        autoplay={true} // Auto-play activado
        autoplaySpeed={5000} // Velocidad de auto-play en milisegundos
      />
      <Container >
      <LinkComponent href="/academia/cursos" text="Ver más cursos ❯" />
      </Container>

     
    </>
  );
};

export default Page;
