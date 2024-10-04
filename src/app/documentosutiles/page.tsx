import React from "react";
import BannerSlidernew from "../components/BannerSlidernew/BannerSlidernew";
import TitleText from "../components/Text/TitleText";
import Modulov2 from "../components/ModuloV2/Modulov2";
import Container from "../components/Container/Container";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const images = ["/documentosutiles.png"];
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

      <TitleText subtitle="¡Bienvenidos a nuestra plataforma de documentos útiles! Aquí encontrarás una extensa colección de recursos que te ayudarán en tus proyectos, podrás descargar y personalizar según su empresa o trabajo. Utilice estos documentos para sus labores, entregas y proyectos en general." />
      <Container
        displayType="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <Modulov2
          imageUrl="/doc1.png"
          text="Este archivo le ayudará a crear el presupuesto de la obra de forma correcta y clara para presentar a su cliente."
          text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
          urlPDF="/doc/ejemplo.pdf"
          urlExcel="/doc/ejemplo.xlsx"
          urlExample="/doc/ejemplo.pdf"
          linkText="Cotización >"
        />
        <Modulov2
          imageUrl="/doc2.png"
          text="Utilice este archivo para calcular de manera concisa cual será el costo para usted de algún proyecto a realizar, en este podrá separar los gastos por categorías como: insumos, mano de obra, comida, traslados, entre otros, para visibilizar todos los gastos que conlleva el proyecto."
          text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
          urlPDF="/doc/ejemplo.pdf"
          urlExcel="/doc/ejemplo.xlsx"
          urlExample="/doc/ejemplo.pdf"
          linkText="Costos de proyectos >"
        />
        <Modulov2
          imageUrl="/doc3.png"
          text="Este archivo le ayudará a crear el presupuesto de la obra de forma correcta y clara para presentar a su cliente."
          text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
          urlPDF="/doc/ejemplo.pdf"
          urlExcel="/doc/ejemplo.xlsx"
          urlExample="/doc/ejemplo.pdf"
          linkText="Planificación de proyectos >"
        />
      </Container>
      <Container
        displayType="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <Modulov2
          imageUrl="/doc1.png"
          text="Este archivo le ayudará a crear el presupuesto de la obra de forma correcta y clara para presentar a su cliente."
          text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
          urlPDF="/doc/ejemplo.pdf"
          urlExcel="/doc/ejemplo.xlsx"
          urlExample="/doc/ejemplo.pdf"
          linkText="Cotización >"
        />
        <Modulov2
          imageUrl="/doc2.png"
          text="Utilice este archivo para calcular de manera concisa cual será el costo para usted de algún proyecto a realizar, en este podrá separar los gastos por categorías como: insumos, mano de obra, comida, traslados, entre otros, para visibilizar todos los gastos que conlleva el proyecto."
          text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
          urlPDF="/doc/ejemplo.pdf"
          urlExcel="/doc/ejemplo.xlsx"
          urlExample="/doc/ejemplo.pdf"
          linkText="Costos de proyectos >"
        />
        <Modulov2
          imageUrl="/doc3.png"
          text="Este archivo le ayudará a crear el presupuesto de la obra de forma correcta y clara para presentar a su cliente."
          text2=" * Archivo con formato referencial. Este documento en ninguna circunstancia tiene carácter legal."
          urlPDF="/doc/ejemplo.pdf"
          urlExcel="/doc/ejemplo.xlsx"
          urlExample="/doc/ejemplo.pdf"
          linkText="Planificación de proyectos >"
        />
      </Container>
      <TitleText subtitle="Esperamos que encuentres todo lo que necesitas para tener éxito en tus proyectos. ¡Bienvenido a un mundo de recursos valiosos a tu alcance!" />
    </>
  );
};
export default Page;
