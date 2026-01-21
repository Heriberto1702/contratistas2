import React, { Suspense } from "react";
import Breadcrumbs from "../components/Breadcrumbs/breadcrumbs";
import TitleText from "../components/Text/TitleText";
import Modulov2 from "../components/ModuloV2/Modulov2";
import BannerStatic from "../components/BannerEstatico/BannerStatic";
import NavBar from "../components/navbar/NavBar";
import styles from "../components/ModuloV2/Modulov2.module.css";

const Page = () => {
 
  return (
    <>
      <NavBar />
      <BannerStatic images={["/documentosutiles.png"]} />
      <Suspense>

      <Breadcrumbs />
      </Suspense>
      <TitleText
        title="¡Bienvenidos a nuestra plataforma de documentos útiles!"
        text="Aquí encontrarás recursos que te ayudarán en tus proyectos, donde podrás descargarlos y personalizarlos según su empresa o trabajo."
      />

      
      <div className={styles.moduloContainer}>
          <Modulov2
            imageUrl="/cotizacion.jpg"
            text="Este archivo le ayudará a crear el presupuesto de la obra de forma correcta y clara para presentar a su cliente."
            text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
            urlExcel="/doc/cotizacion-construccion.xlsx"
            linkText="Cotización ❯"
          />
          <Modulov2
            imageUrl="/recibodedinero.jpg"
            text="Utilice este archivo para calcular de manera concisa cual será el costo para usted de algún proyecto a realizar..."
            text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
            urlExcel="/doc/recibo-de-dinero.xlsx"
            linkText="Recibo de Dinero ❯"
          />
          <Modulov2
            imageUrl="/planeacion.jpg"
            text="Este archivo le ayudará a crear el presupuesto de la obra de forma correcta y clara para presentar a su cliente."
            text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
            urlExcel="/doc/planificador-de-proyecto.xlsx"
            linkText="Planificación de proyectos ❯"
          />
          <Modulov2
            imageUrl="/recepciondeltrabajo.jpg"
            text="Este archivo le ayudará a crear el presupuesto de la obra de forma correcta y clara para presentar a su cliente."
            text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
            urlExcel="/doc/recepcion-del-trabajo.xlsx"
            linkText="Recepción del trabajo ❯"
          />
   </div>
      

      <TitleText text="¡Utiliza de la mejor manera estos recursos, nosotros te apoyamos en tu agilidad de procesos!" />
    </>
  );
};

export default Page;
