import { PDF } from '../../../types/course';
import styles from './PdfViewer.module.css'; // Importar el CSS
import Image from 'next/image';
interface PDFDetailProps {
  pdf: PDF;
}

const PdfDetail: React.FC<PDFDetailProps> = ({ pdf }) => {
  return (
    <div className={styles.container}> {/* Aplicar la clase del contenedor */}
      <h1 className={styles.Title}>{pdf.title}</h1> {/* Aplicar la clase del título */}
      <p className={styles.Subtitle}>{pdf.description}</p> {/* Aplicar la clase de descripción */}
      <Image className={styles.img} width={2000} height={2000} alt="" src={pdf.url}/>
    </div>
  );
};

export default PdfDetail;