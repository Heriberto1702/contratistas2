"use client"
import React from 'react';
import { useParams } from 'next/navigation'; // Importar useParams de next/navigation
import PdfViewer from '../../../components/PdfViewer/PdfViewer';
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import NavBar from "../../../components/navbar/NavBar";

const bannerImages = ["/banneracademia.png"];

const DocsPage = () => {
  const { id } = useParams(); // Obtener el id de la URL usando useParams

  // Validar que el id existe antes de renderizar el componente PdfViewer
  if (!id) {
    return <div>Cargando...</div>; // O puedes mostrar un mensaje de "Cargando..." mientras se obtiene el id
  }

  return (
    <div>
      <NavBar />
      <BannerSlidernew images={bannerImages} interval={3000} />
      <div>
        {/* Pasamos el id dinámico a PdfViewer */}
        <PdfViewer params={{ id: id as string }} />
      </div>
    </div>
  );
};

export default DocsPage;
