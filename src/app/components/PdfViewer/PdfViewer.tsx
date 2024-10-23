import { PDF } from '../../../types/course';
import styles from '../Text/TitleText.module.css'; // Importar el CSS

interface PDFDetailProps {
  pdf: PDF;
}

const PdfDetail: React.FC<PDFDetailProps> = ({ pdf }) => {
  return (
    <div className={styles.container}> {/* Aplicar la clase del contenedor */}
      <h1 className={styles.Title}>{pdf.title}</h1> {/* Aplicar la clase del título */}
      <p className={styles.Subtitle}>{pdf.description}</p> {/* Aplicar la clase de descripción */}
     
    </div>
  );
};

export default PdfDetail;