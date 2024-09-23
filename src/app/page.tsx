import React from "react";
import BannerSlidernew from "@/app/components/BannerSlidernew/BannerSlidernew";
import Cards from "@/app/components/Cards/Cards";
import DoubleCarousel from "@/app/components/DoubleCarusel/DoubleCarousel";
import SimpleCard from "@/app/components/SimpleCard/SimpleCard";
import TitleText from "@/app/components/Text/TitleText";
import Banner from "./components/Banner/Banner";
import Link from "next/link";
import Image from "next/image";
const Page = () => {
  const images = ["/banner.png", "/banner.png"];
  const banners = [
    {
      id: 1,
      image: "/bannerdoble.png",
      title: "Capacitación online Nexx",
      text: "Martes 10 de Octubre 2023 Inicio: 10:00 p.m. Curso Disponible hasta 23 de Octubre",
      link: "/link1",
    },

    {
      id: 2,
      image: "/bannerdoble.png",
      title: "Capacitación online Nexx",
      text: "Martes 10 de Octubre 2023 Inicio: 10:00 p.m. Curso Disponible hasta 23 de Octubre",
      link: "/link2",
    },

    {
      id: 3,
      image: "/bannerdoble.png",
      title: "Capacitación online Nexx",
      text: "Martes 10 de Octubre 2023 Inicio: 10:00 p.m. Curso Disponible hasta 23 de Octubre",
      link: "/link3",
    },

    {
      id: 4,
      image: "/bannerdoble.png",
      title: "Capacitación online Nexx",
      text: "Martes 10 de Octubre 2023 Inicio: 10:00 p.m. Curso Disponible hasta 23 de Octubre",
      link: "/link4",
    },
  ];
  return (
    <>
      <header>
        <nav>
          <div>
            <Link href="/">
              <Image
                src="/logoContratista.png"
                alt="logo-Contratista"
                width={182}
                height={119}
              />
            </Link>
          </div>
          <div>
            <Link href="/beneficios">Beneficios</Link>
            <Link href="/compras">Compras</Link>
            <Link href="/puntos">Puntos</Link>
            <Link href="/academia">Academia para Contratistas</Link>
            <Link href="/documentosutiles">Documentos útiles</Link>
            <Link href="/cuenta">Cuenta</Link>
          </div>
        </nav>
      </header>
      <BannerSlidernew images={images} interval={3000} />
      <Banner
        imageUrl="/evento.png"
        linkUrl="https://www.example.com"
        altText="Ejemplo de imagen"
        width={1224}
        height={317}
      />
      <TitleText
        title="Bienvenido a nuestro CLUB PRO"
        subtitle="Conozca nuestro mundo de beneficios por segmento y sigamos creciendo juntos"
      />
      <Banner
        imageUrl="/clubpro.png"
        linkUrl="https://www.example.com"
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
      <Banner
        imageUrl="/canjear.png"
        linkUrl="https://www.example.com"
        altText="Ejemplo de imagen"
        width={1224}
        height={317}
      />
    </>
  );
};

export default Page;
