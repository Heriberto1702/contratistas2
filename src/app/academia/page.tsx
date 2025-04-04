import BannerSlidernew from "../components/BannerSlidernew/BannerSlidernew";
import Container from "../components/Container/Container";
import EventCalendar from "../components/EventCalendar/EventCalendar";
import ImageText from "../components/Imagen/Imagen";
import Modulo from "../components/Modulo/Modulo";
import Documentos from "../components/DocumentosAcademy/Documentos";
import TitleText from "../components/Text/TitleText";
import React from "react";
import Styles from "../components/DocumentosAcademy/Documentos.module.css";
import Link from "next/link";
import NavBar from "../components/navbar/NavBar";
import LinkComponent from "../components/LinkComponent/LinkComponent";

const Page = () => {
  const images = ["/banneracademia.png"];

  // Declaración de las cards con sus datos ajustados para el componente Documentos
  const cards = [
    { id: '1', title: "Como fidelizar a sus clientes", imageUrl: '/card1.png', url: "/academia/docpdf/1" },
    { id: '2', title: "Como armar un buen presupuesto", imageUrl: '/card2.png', url: "/academia/docpdf/2" },
    { id: '3', title: "Como formalizar su empresa", imageUrl: '/card3.png', url: "/academia/docpdf/3" },
  ];

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
        <ImageText imageUrl="/feriaregional.png" alt="" text="Ferias Regionales" />
      </Container>

      {/* Sección de cards documentos */}
      <TitleText subtitle="Documentos disponibles" />
      <Documentos modules={cards} />

      {/* Calendario de actividades */}
      <TitleText subtitle="Calendario de Actividades" />
      <EventCalendar />

      {/* Cursos destacados */}
      <TitleText subtitle="Cursos Destacados" />
      
      <Container displayType="flex" flexDirection="row" justifyContent="center" alignItems="center" gap="1rem">
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

      {/* Enlace para ver más cursos */}
      <TitleText subtitle="Todo lo que necesitás para perfeccionarte" />
      <Container displayType="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <LinkComponent href="/academia/cursos" text="Ver más cursos >" />
      </Container>
    </>
  );
};

export default Page;
