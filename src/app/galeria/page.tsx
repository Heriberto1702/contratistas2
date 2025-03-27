"use client";
import Link from "next/link";
import React from "react";
import styles from "./galeria.module.css";
import Image from "next/image";
import BannerSlidernew from "../components/BannerSlidernew/BannerSlidernew";
import TitleText from "../components/Text/TitleText";
import NavBar from "../components/navbar/NavBar";

const categories = [
  { id: "cat1", imgSrc: "/galeria/categorias/categ1.png", name: "Ver más" },
  { id: "cat2", imgSrc: "/galeria/categorias/categ2.png", name: "Ver más" },
  { id: "cat3", imgSrc: "/galeria/categorias/categ3.png", name: "Ver más" },
  { id: "cat4", imgSrc: "/galeria/categorias/categ4.png", name: "Ver más" },
  { id: "cat5", imgSrc: "/galeria/categorias/categ5.png", name: "Ver más" },
  { id: "cat6", imgSrc: "/galeria/categorias/categ6.png", name: "Ver más" },
];
const images = ["/banner.png", "/banner.png"];

const Galeria = () => {
  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />
      <TitleText subtitle="¡Bienvenidos a nuestra plataforma de documentos útiles! Aquí encontrarás una extensa colección de recursos que te ayudarán en tus proyectos, podrás descargar y personalizar según su empresa o trabajo. Utilice estos documentos para sus labores, entregas y proyectos en general." />

      <div className={styles.grid}>
        {categories.map((category) => (
          <Link href={`/galeria/${category.id}`} key={category.id}>
            <div className={styles.categoryItem}>
              <Image
                src={category.imgSrc}
                alt={category.name}
                width={200}
                height={200}
              />
              <p>{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Galeria;
