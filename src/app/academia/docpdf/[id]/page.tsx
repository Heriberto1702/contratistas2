import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";

// Tipado de los parámetros de la URL
interface Params {
  id: string;
}

const DocsPage = ({ params }: { params: { id: string } }) => {
  // Datos de las imágenes, no de PDFs
  const images: Record<string, { title: string; url: string }> = {
    '1': { title: 'Imagen 1', url: '/pdf/fidelizar.png' },
    '2': { title: 'Imagen 2', url: '/pdf/formaliza.png' },
    '3': { title: 'Imagen 3', url: '/pdf/presupuesto.png' },
  };

  const image = images[params.id];

  // Si no existe la imagen con el ID proporcionado, mostrar página 404
  if (!image) {
    notFound();
  }

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

      {/* Banner con la imagen correspondiente */}
      <BannerSlidernew images={[image.url]} interval={3000} />

      {/* Mostrar la imagen de acuerdo con el ID */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <h1>{image.title}</h1>
        <Image
          src={image.url}
          alt={image.title}
          width={800}
          height={600}
          style={{ objectFit: 'contain' }}
        />
      </div>
    </>
  );
};

export default DocsPage;
