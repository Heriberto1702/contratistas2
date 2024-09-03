import BannerSlidernew from "../components/BannerSlidernew/BannerSlidernew";
import ColoredDiv from "../components/ColoredDiv/ColoredDiv";
import Container from "../components/Container/Container";
import EventCalendar from "../components/EventCalendar/EventCalendar";
import ImageText from "../components/Imagen/Imagen";
import Modulo from "../components/Modulo/Modulo";
import TitleText from "../components/Text/TitleText";
import React from "react";

const Page = () => {
  const images = ["/banneracademia.png"];
  return (
    <>
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
        <ColoredDiv
          backgroundColor="#FBB016"
          width="200px"
          height="3px"
        />
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
        <ImageText imageUrl="/feriaregional.png" alt="" text="Ferias Regionales" />
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
          url="https://www.sinsa.com.ni"
          linkText="Leer más >"
          title2="Como armar un buen presupuesto."
          imageUrl2="/card2.png"
          url2="https://www.sinsa.com.ni"
          linkText2="Leer más >"
          title3="Como formalizar su empresa."
          imageUrl3="/card3.png"
          url3="https://www.sinsa.com.ni"
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
        <ColoredDiv
          backgroundColor="#FBB016"
          width="200px"
          height="3px"
        />
      </Container>
      <EventCalendar />
    </>
  );
};
export default Page;
