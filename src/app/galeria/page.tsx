"use client";
import React, { useState } from "react";
import styles from "./galeria.module.css";
import BannerSlidernew from "../components/BannerSlidernew/BannerSlidernew";
import TitleText from "../components/Text/TitleText";
import NavBar from "../components/navbar/NavBar";
import Categorias from "../components/Gallery/Categorias";
import Galeria from "../components/Gallery/Galeria";

const images = ["/banner.png", "/banner.png"];
const GaleriaPage = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    string | null
  >(null);
  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />
      <TitleText subtitle="Nuestra Galería de fotos, eventos y talleres." />
      <div>
        <Categorias onSelectCategoria={setCategoriaSeleccionada} />
        {categoriaSeleccionada && <Galeria categoria={categoriaSeleccionada} />}
      </div>
    </>
  );
};

export default GaleriaPage;
