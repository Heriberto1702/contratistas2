"use client";
import React, { useState } from "react";
import BannerSlidernew from "../components/BannerSlidernew/BannerSlidernew";
import TitleText from "../components/Text/TitleText";
import NavBar from "../components/navbar/NavBar";
import Categorias from "../components/Gallery/Categorias";
import Galeria from "../components/Gallery/Galeria";
import Breadcrumbs from "../components/Breadcrumbs/breadcrumbs";

const images = ["/banner.png", "/banner.png"];
const GaleriaPage = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    string | null
  >(null);
  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />
      <Breadcrumbs />

      <TitleText
        title={<>Galería de fotos, eventos y talleres</>}
        subtitle={
          <>
           Categorías
          </>
        }
        text="Seleccione primero una categoría para cargar las fotos de la colección"
        />
      <div>
      
        <Categorias onSelectCategoria={setCategoriaSeleccionada} />
        <TitleText subtitle="Galería de fotos" />
        {categoriaSeleccionada && <Galeria categoria={categoriaSeleccionada} />}
      </div>
    </>
  );
};

export default GaleriaPage;
