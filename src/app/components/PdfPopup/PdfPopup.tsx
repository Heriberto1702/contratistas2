import styles from "./PdfPopup.module.css";

interface PdfPopupProps {
  module: {
    titulo_modulo: string;
    recursopdf?: string;
  };
  onClose: () => void;
}

const PdfPopup: React.FC<PdfPopupProps> = ({ module, onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>{module.titulo_modulo}</h2>
        {module.recursopdf ? (
          <iframe
            src={module.recursopdf}
            width="100%"
            height="90%"
            title="PDF Viewer"
          ></iframe>
        ) : (
          <p>No hay un recurso PDF disponible.</p>
        )}
        <button className={styles.closeButton} onClick={onClose}>
        &times;
        </button>
      </div>
    </div>
  );
};

export default PdfPopup;
