"use client";
import Link from 'next/link';
import React from "react";
import styles from './galeria.module.css';
import Image from "next/image";
import BannerSlidernew from "../components/BannerSlidernew/BannerSlidernew";
import TitleText from "../components/Text/TitleText";

const categories = [
    { id: 'cat1', imgSrc: '/galeria/categorias/categ1.png', name: 'Categoría 1' },
    { id: 'cat2', imgSrc: '/galeria/categorias/categ2.png', name: 'Categoría 2' },
    { id: 'cat3', imgSrc: '/galeria/categorias/categ3.png', name: 'Categoría 3' },
    { id: 'cat4', imgSrc: '/galeria/categorias/categ4.png', name: 'Categoría 4' },
    { id: 'cat5', imgSrc: '/galeria/categorias/categ5.png', name: 'Categoría 5' },
    { id: 'cat6', imgSrc: '/galeria/categorias/categ6.png', name: 'Categoría 6' },
];
const images = ["/banner.png", "/banner.png"];

const Galeria = () => {
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
        <Link href="/galeria">Galería</Link>
        <Link href="/cuenta">Cuenta</Link>
      </div>
    </nav>
  </header>
  <BannerSlidernew images={images} interval={3000} />

  <TitleText subtitle="¡Bienvenidos a nuestra plataforma de documentos útiles! Aquí encontrarás una extensa colección de recursos que te ayudarán en tus proyectos, podrás descargar y personalizar según su empresa o trabajo. Utilice estos documentos para sus labores, entregas y proyectos en general." />
  
  <div className={styles.grid}>
      {categories.map((category) => (
        <Link href={`/galeria/${category.id}`} key={category.id}>
          <div className={styles.categoryItem}>
            <Image src={category.imgSrc} alt={category.name} width={200} height={200} />
            <p>{category.name}</p>
          </div>
        </Link>
      ))}
    </div>
    </>
  );
};

export default Galeria;
