import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Styles from './PdfViewer.module.css'; // Asegúrate de tener este archivo CSS

// Arreglo de imágenes con su título y URL
const images: Record<string, { title: string; descripcion: string; url: string }> = {
  '1': { title: 'Maestros y Maestras de la construcción, mantengan a sus clientes satisfechos con esta serie de consejos que le presentamos.', descripcion:"Mantenerlos fidelizados es de suma importancia y utilidad ya que con esto aumenta las probabilidades de que le vuelvan a contratar y recomienden sus servicios a otras personas, ampliando así su cartera de clientes." , url: '/pdf/fidelizar.png' },
  '2': { title: 'Sabemos la importancia de formalizar su empresa y los múltiples beneficios de que esta puede llevar al hacerlo de la manera adecuada.', descripcion:"Por eso le proporcionamos una guía sobre los diferentes tipos de empresas, las ventajas de cada una y ¡cómo crear la suya paso a paso en 1 día!" , url: '/pdf/presupuesto.png' },
  '3': { title: 'Sabemos la importancia de formalizar su empresa y los múltiples beneficios de hacerlo.', descripcion:"Por eso le proporcionamos una guía sobre los diferentes tipos de empresas, las ventajas de cada una y ¡cómo crear la suya paso a paso en 1 día!" , url: '/pdf/formaliza.png' },
};

interface Params {
  id: string;
}

// El componente PdfViewer ahora recibe `params` como prop
const PdfViewer = ({ params }: { params: Params }) => {
  const { id } = params;

  // Validar que el ID esté disponible en los parámetros y que exista en el arreglo `images`
  if (!id || !images[id]) {
    notFound(); // Redirige a una página 404 si no se encuentra el ID o el objeto correspondiente
  }

  // Seleccionar la imagen correspondiente al ID
  const selectedImage = images[id];

  return (
    <div className={Styles.pdfViewerContainer}>
      <Link href="/academia" className={Styles.breadcumb}>« Regresar</Link>
      <h1 className={Styles.Title}>{selectedImage.title}</h1>
      <p className={Styles.Subtitle}>{selectedImage.descripcion}</p>
      <Image className={Styles.img} src={selectedImage.url} alt={selectedImage.title} width={800} height={600} />
      
    </div>
  );
};

export default PdfViewer;
