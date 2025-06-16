"use client";
import React, { Suspense, useState } from "react";

import TitleText from "../components/Text/TitleText";
import NavBar from "../components/navbar/NavBar";
import BannerStatic from "../components/BannerEstatico/BannerStatic";
import Categorias from "../components/Gallery/Categorias";
import Galeria from "../components/Gallery/Galeria";
import Breadcrumbs from "../components/Breadcrumbs/breadcrumbs";

const GaleriaPage = () => {
  // Cambiar el tipo a number | null
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);

  return (
    <>
      <NavBar />
      <BannerStatic images={["/banner3.png"]} />
      <Suspense>

      <Breadcrumbs />
      </Suspense>

      <TitleText
        title={<>Galería de fotos, eventos y talleres</>}
        subtitle={<>Categorías</>}
        text="Seleccione primero una categoría para cargar las fotos de la colección"
      />

      <div>
        <Categorias onSelectCategoria={setCategoriaSeleccionada} />
        {/* Solo renderiza la galería si hay una categoría seleccionada */}
        {categoriaSeleccionada !== null && <Galeria categoria={categoriaSeleccionada.toString()} />}
      </div>
    </>
  );
};

export default GaleriaPage;
