import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PdfViewer.module.css'; // Asegúrate de tener este archivo CSS

// Arreglo de imágenes con su título y URL
const images: Record<string, { title: string; url: string }> = {
  '1': { title: 'Como fidelizar a sus clientes.', url: '/pdf/fidelizar.png' },
  '2': { title: 'Como armar un buen presupuesto.', url: '/pdf/presupuesto.png' },
  '3': { title: 'Como formalizar su empresa.', url: '/pdf/formaliza.png' },
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
    <div className={styles.pdfViewerContainer}>
      <h1>{selectedImage.title}</h1>
      <Image src={selectedImage.url} alt={selectedImage.title} width={800} height={600} />
      <Link href="/academia">Regresar</Link>
    </div>
  );
};

export default PdfViewer;
