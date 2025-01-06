import BannerSlidernew from "../components/BannerSlidernew/BannerSlidernew";
import ColoredDiv from "../components/ColoredDiv/ColoredDiv";
import Container from "../components/Container/Container";
import EventCalendar from "../components/EventCalendar/EventCalendar";
import ImageText from "../components/Imagen/Imagen";
import Modulo from "../components/Modulo/Modulo";
import TitleText from "../components/Text/TitleText";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import NavBar from "../components/navbar/NavBar";
import LinkComponent from "../components/LinkComponent/LinkComponent";


const Page = () => {
  const images = ["/banneracademia.png"];

  // Declaración de las cards con sus datos
  const cards = [
    { id: '1', title: '', image: '/card1.png' },
    { id: '2', title: '', image: '/card2.png' },
    { id: '3', title: '', image: '/card3.png' },
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

      {/* Sección de cards */}
      <TitleText subtitle="Documentos disponibles" />
      <Container displayType="flex" flexDirection="row" justifyContent="center" alignItems="center" gap="1rem">
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {cards.map((card) => (
            <div
              key={card.id}
              style={{
                border: '1px solid #ccc',
                padding: '20px',
                textAlign: 'center',
                width: '250px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3>{card.title}</h3>
              <Image
                src={card.image}
                alt={card.title}
                width={200}
                height={150}
                style={{ objectFit: 'cover', marginBottom: '10px' }}
              />
              {/* Actualización aquí: usando Link sin <a> */}
              <Link href={`/academia/docpdf/${card.id}`} passHref>
                <span style={{ display: 'inline-block', marginTop: '10px', color: '#0070f3', textDecoration: 'underline' }}>
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
      <EventCalendar />

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
          url="academia/secciones/1"
          linkText="Leer más >"
          title2="Capacitación Online Drytec"
          imageUrl2="/curso2.png"
          logo2="/drytec.png"
          url2="academia/secciones/2"
          linkText2="Leer más >"
          title3="Lo que debes saber sobre pintura."
          imageUrl3="/curso3.png"
          logo3="/lanco.png"
          url3="academia/secciones/3"
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
