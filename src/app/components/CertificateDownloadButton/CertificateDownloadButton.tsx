// components/CertificateDownloadButton/CertificateDownloadButton.tsx
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "./CertificateDownloadButton.module.css";
interface CertificateDownloadButtonProps {
  nombre_contratista: string | null;
  nombre_curso: string | null;
}

const generateCertificate = (
  nombre_contratista: string,
  curso: { nombre_curso: string }
) => {
  const doc = new jsPDF("landscape");

  // Fondo suave con bordes
  doc.setFillColor(255, 255, 255); // Fondo blanco
  doc.rect(10, 10, 270, 190, "F"); // Fondo cuadrado
  doc.setDrawColor(0, 102, 204); // Azul suave para el borde
  doc.setLineWidth(1); // Ancho de borde suave
  doc.rect(10, 10, 270, 190); // Borde exterior del certificado

  // Logo
  const logoUrl = "/logoContratista.png";
  doc.addImage(logoUrl, "PNG", 20, 15, 50, 50); // Logo más pequeño y posicionado arriba a la izquierda

  // Título
  doc.setFont("times", "bold");
  doc.setFontSize(30); // Título más grande
  doc.setTextColor(0, 102, 204); // Azul suave
  doc.text("CERTIFICADO DE FINALIZACIÓN", 80, 60);

  // Línea decorativa (más sutil)
  doc.setDrawColor(0, 102, 204); // Azul suave
  doc.setLineWidth(0.5);
  doc.line(50, 65, 240, 65);

  // Subtítulo
  doc.setFont("times", "italic");
  doc.setFontSize(18); // Un tamaño intermedio que resalta
  doc.setTextColor(80, 80, 80); // Gris suave
  doc.text("Este certificado es otorgado a:", 100, 85);

  // Nombre del contratista
  doc.setFont("times", "bold");
  doc.setFontSize(24); // Aumentado ligeramente
  doc.setTextColor(20, 20, 20); // Negro elegante
  doc.text(nombre_contratista, 100, 105);

  // Descripción del curso
  doc.setFont("times", "italic");
  doc.setFontSize(16);
  doc.setTextColor(80, 80, 80); // Gris suave
  doc.text("Por haber completado satisfactoriamente el curso:", 60, 125);

  // Nombre del curso
  doc.setFont("times", "bold");
  doc.setFontSize(22); // Tamaño intermedio y elegante
  doc.setTextColor(0, 102, 204); // Azul
  doc.text(`"${curso.nombre_curso}"`, 90, 145);

  // Fecha de emisión
  doc.setFont("times", "italic");
  doc.setFontSize(14); // Más pequeño para balancear
  doc.setTextColor(80, 80, 80); // Gris suave
  doc.text("Fecha de emisión: " + new Date().toLocaleDateString(), 100, 165);

  // Firma
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0); // Negro para la firma
  doc.text("_________________________", 180, 175);
  doc.text("Instructor Certificador", 190, 185);

  // Guardar el archivo PDF
  doc.save(`Certificado_${nombre_contratista}.pdf`);
};

const CertificateDownloadButton: React.FC<CertificateDownloadButtonProps> = ({
  nombre_contratista,
  nombre_curso,
}) => {
  const handleDownloadCertificate = () => {
    if (nombre_contratista && nombre_curso) {
      generateCertificate(nombre_contratista, { nombre_curso });
    } else {
      console.error("Nombre del contratista o del curso no está definido.");
    }
  };

  return (
    <button
    className={styles.downloadButton}
      onClick={handleDownloadCertificate}
      disabled={!nombre_contratista || !nombre_curso}
    >
      Descargar Certificado
    </button>
    
  );
};

export default CertificateDownloadButton;
