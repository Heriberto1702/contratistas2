import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import NavBar from "../../../components/navbar/NavBar";



  const bannerImages = ["/banneracademia.png"];
const DocsPage = ({ params }: { params: { id: string } }) => {

  // Datos de las imágenes, no de PDFs
  const images: Record<string, { title: string; url: string }> = {
    '1': { title: '', url: '/pdf/fidelizar.png' },
    '2': { title: '', url: '/pdf/formaliza.png' },
    '3': { title: '', url: '/pdf/presupuesto.png' },
  };

  const selectedImage = images[params.id];

  // Si no existe la imagen con el ID proporcionado, mostrar página 404
  if (!selectedImage) {
    notFound();
  }

  return (
    <>
       <NavBar />


      <BannerSlidernew images={bannerImages} interval={3000} />


      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <h1>{selectedImage.title}</h1>
        <Image
          src={selectedImage.url}
          alt={selectedImage.title}
          width={800}
          height={600}
          style={{ objectFit: 'contain' }}
        />
      </div>
    </>
  );
};

export default DocsPage;
