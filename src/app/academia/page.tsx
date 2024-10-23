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
import LinkComponent from "../components/LinkComponent/LinkComponent";

const Page = () => {
  const images = ["/banneracademia.png"];
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
            <Link href="/compras">Compras</Link>
            <Link href="/academia">Academia para Contratistas</Link>
            <Link href="/documentosutiles">Documentos útiles</Link>
            <Link href="/cuenta">Cuenta</Link>
          </div>
        </nav>
      </header>
      <BannerSlidernew images={images} interval={3000} />
      <TitleText
        title="¿Qué es Academia para Contratistas?"
        text="Es una plataforma online de capacitación del Círculo de Especialistas en la que solo por ser socio podrá aprender diversas técnicas y conocer nuevos productos e innovaciones para perfeccionar su trabajo."
      />
      <Container
        displayType="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
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

      <Container
        displayType="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <Modulo
          title="Como fidelizar a sus clientes."
          imageUrl="/card1.png"
          url="academia/docpdf/1"
          linkText="Leer más >"
          title2="Como armar un buen presupuesto."
          imageUrl2="/card2.png"
          url2="academia/docpdf/2"
          linkText2="Leer más >"
          title3="Como formalizar su empresa."
          imageUrl3="/card3.png"
          url3="academia/docpdf/3"
          linkText3="Leer más >"
        />
      </Container>

      <TitleText subtitle="Calendario de Actividades" />
      <Container
        displayType="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <ColoredDiv backgroundColor="#FBB016" width="200px" height="3px" marginTop="5px" marginBottom="10px" />
      </Container>
      <EventCalendar />
      <TitleText subtitle="Cursos Destacados" />
      <Container
        displayType="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <ColoredDiv backgroundColor="#FBB016" width="200px" height="3px" marginTop="5px" marginBottom="10px" />
      </Container>
      <Container
        displayType="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <Modulo
          title="Instalaciones electricas básicas domiciliarias"
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
      <TitleText subtitle="Todo lo que necesitás para perfeccionarte" />
      <Container
        displayType="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
      <LinkComponent href="/academia/cursos" text="Ver más cursos >" />
      </Container>

    </>
  );
};
export default Page;
