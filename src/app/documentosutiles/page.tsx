import React from "react";
import BannerSlidernew from "../components/BannerSlidernew/BannerSlidernew";
import TitleText from "../components/Text/TitleText";
import Modulov2 from "../components/ModuloV2/Modulov2";
import Container from "../components/Container/Container";
import NavBar from "../components/navbar/NavBar";
import styles from "../components/ModuloV2/Modulov2.module.css";

const Page = () => {
  const images = ["/documentosutiles.png"];
  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />

      <TitleText
        title="¡Bienvenidos a nuestra plataforma de documentos útiles!"
        text="Aquí encontrarás recursos que te ayudarán en tus proyectos, donde podrás descargarlos y personalizarlos según su empresa o trabajo."
      />

      <Container>
      <div className="modulo-container">
          <Modulov2
            imageUrl="/doc1.png"
            text="Este archivo le ayudará a crear el presupuesto de la obra de forma correcta y clara para presentar a su cliente."
            text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
            urlExcel="/doc/cotizacion-construccion.xlsx"
            linkText="Cotización ❯"
          />
          <Modulov2
            imageUrl="/doc2.png"
            text="Utilice este archivo para calcular de manera concisa cual será el costo para usted de algún proyecto a realizar..."
            text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
            urlExcel="/doc/recibo-de-dinero.xlsx"
            linkText="Recibo de Dinero ❯"
          />
          <Modulov2
            imageUrl="/doc3.png"
            text="Este archivo le ayudará a crear el presupuesto de la obra de forma correcta y clara para presentar a su cliente."
            text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
            urlExcel="/doc/planificador-de-proyecto.xlsx"
            linkText="Planificación de proyectos ❯"
          />
          <Modulov2
            imageUrl="/doc3.png"
            text="Este archivo le ayudará a crear el presupuesto de la obra de forma correcta y clara para presentar a su cliente."
            text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
            urlExcel="/doc/recepcion-del-trabajo.xlsx"
            linkText="Recepción del trabajo ❯"
          />
   </div>
      </Container>

      <TitleText text="¡Utiliza de la mejor manera estos recursos, nosotros te apoyamos en tu agilidad de procesos!" />
    </>
  );
};

export default Page;
