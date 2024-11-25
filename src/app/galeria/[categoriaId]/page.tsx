"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import BannerSlidernew from "../../components/BannerSlidernew/BannerSlidernew";
import TitleText from "../../components/Text/TitleText";
import ImageGallery from "../../components/Gallery/ImageGallery";
import Link from "next/link";
import Image from "next/image";
import Styles from "../galeria.module.css";
import NavBar from "../../components/navbar/NavBar";

const categoryImages: { [key: string]: string[] } = {
  cat1: [
    "/galeria/cat1/img1.png",
    "/galeria/cat1/img2.png",
    "/galeria/cat1/img3.png",
    "/galeria/cat1/img4.png",
    "/galeria/cat1/img5.png",
    "/galeria/cat1/img6.png",
    "/galeria/cat1/img7.png",
    "/galeria/cat1/img8.png",
  ],
  cat2: [
    "/galeria/cat2/img1.png",
    "/galeria/cat2/img2.png",
    "/galeria/cat2/img3.png",
    "/galeria/cat2/img4.png",
    "/galeria/cat2/img5.png",
    "/galeria/cat2/img6.png",
    "/galeria/cat2/img7.png",
    "/galeria/cat2/img8.png",
  ],
  cat3: [
    "/galeria/cat3/img1.png",
    "/galeria/cat3/img2.png",
    "/galeria/cat3/img3.png",
    "/galeria/cat3/img4.png",
    "/galeria/cat3/img5.png",
    "/galeria/cat3/img6.png",
    "/galeria/cat3/img7.png",
    "/galeria/cat3/img8.png",
  ],
  cat4: [
    "/galeria/cat4/img1.png",
    "/galeria/cat4/img2.png",
    "/galeria/cat4/img3.png",
    "/galeria/cat4/img4.png",
    "/galeria/cat4/img5.png",
    "/galeria/cat4/img6.png",
    "/galeria/cat4/img7.png",
    "/galeria/cat4/img8.png",
  ],
  cat5: [
    "/galeria/cat5/img1.png",
    "/galeria/cat5/img2.png",
    "/galeria/cat5/img3.png",
    "/galeria/cat5/img4.png",
    "/galeria/cat5/img5.png",
    "/galeria/cat5/img6.png",
    "/galeria/cat5/img7.png",
    "/galeria/cat5/img8.png",
  ],
  cat6: [
    "/galeria/cat6/img1.png",
    "/galeria/cat6/img2.png",
    "/galeria/cat6/img3.png",
    "/galeria/cat6/img4.png",
    "/galeria/cat6/img5.png",
    "/galeria/cat6/img6.png",
    "/galeria/cat6/img7.png",
    "/galeria/cat6/img8.png",
  ],
};

const CategoriaPage = () => {
  const params = useParams();
  const router = useRouter();
  const categoriaId = params.categoriaId;

  if (!categoriaId) return <div>Loading...</div>;

  const imagesgallery = categoryImages[categoriaId as string] || [];
  const images = ["/banner.png", "/banner.png"];
  return (
    <>
            <NavBar/>
      <BannerSlidernew images={images} interval={3000} />

      <TitleText subtitle="¡Bienvenidos a nuestra plataforma de documentos útiles! Aquí encontrarás una extensa colección de recursos que te ayudarán en tus proyectos, podrás descargar y personalizar según su empresa o trabajo. Utilice estos documentos para sus labores, entregas y proyectos en general." />

      <div>
        <button className={Styles.breadcumb} onClick={() => router.back()}>
          {" "}
          « Regresar
        </button>
        <ImageGallery images={imagesgallery} />
      </div>
    </>
  );
};
export default CategoriaPage;
