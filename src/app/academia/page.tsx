import BannerSlidernew from "../components/BannerSlidernew/BannerSlidernew";
import ColoredDiv from "../components/ColoredDiv/ColoredDiv";
import Container from "../components/Container/Container";
import EventCalendar from "../components/EventCalendar/EventCalendar";
import ImageText from "../components/Imagen/Imagen";
import Modulo from "../components/Modulo/Modulo";
import TitleText from "../components/Text/TitleText";
import React from "react";
import Styles from "../components/Modulo/Modulo.module.css"
import Link from "next/link";
import NavBar from "../components/navbar/NavBar";
import LinkComponent from "../components/LinkComponent/LinkComponent";


const Page = () => {
  const images = ["/banneracademia.png"];

  // Declaración de las cards con sus datos
  const cards = [
    { id: '1', title: "Como fidelizar a sus clientes", image: '/card1.png' },
    { id: '2', title: "Como armar un buen presupuesto", image: '/card2.png' },
    { id: '3', title: "Como formalizar su empresa", image: '/card3.png' },
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
        text="Es una plataforma online de capacitación del Círculo de Especialistas en la que solo por ser socio podrá aprender diversas técnicas y conocer nuevos productos e innovaciones para perfeccionar su trabajo."
      />
      <Container displayType="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <ColoredDiv backgroundColor="#FBB016" width="200px" height="3px" marginTop="5px" marginBottom="10px" />
      </Container>
      <TitleText subtitle="¿Qué puede encontrar en nuestra Academia para Especialistas?" />
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

      {/* Sección de cards */}
      <TitleText subtitle="Documentos disponibles" />
      <Container displayType="flex" flexDirection="row" justifyContent="center" alignItems="center" gap="1rem">
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center',width: '100%'}}>
          {cards.map((card) => (
            <div className={Styles.subcontainer} style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${card.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "185px", 
            }}
              key={card.id}
            >
              <h3 className={Styles.title} >{card.title}</h3>
              {/* Actualización aquí: usando Link sin <a> */}
              <Link className={Styles.url} href={`/academia/docpdf/${card.id}`} passHref>
                <span >
                  Leer más  
                </span>
              </Link>
            </div>
          ))}
        </div>
      </Container>

      {/* Calendario de actividades */}
      <TitleText subtitle="Calendario de Actividades" />
      <Container displayType="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <ColoredDiv backgroundColor="#FBB016" width="200px" height="3px" marginTop="5px" marginBottom="10px" />
      </Container>
      <EventCalendar  />

      {/* Cursos destacados */}
      <TitleText subtitle="Cursos Destacados" />
      <Container displayType="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <ColoredDiv backgroundColor="#FBB016" width="200px" height="3px" marginTop="5px" marginBottom="10px" />
      </Container>
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
