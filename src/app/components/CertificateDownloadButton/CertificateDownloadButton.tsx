// components/CertificateDownloadButton/CertificateDownloadButton.tsx
import React from "react";
import jsPDF from "jspdf";
import styles from "./CertificateDownloadButton.module.css";

interface CertificateDownloadButtonProps {
  nombre_contratista: string | null;
  nombre_curso: string | null;
}

const loadImageAsBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const generateCertificate = async (
  nombre_contratista: string,
  nombre_curso: string
) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // 🔥 Carga REAL de la imagen
  const backgroundBase64 = await loadImageAsBase64("/certificado.jpg");

  // A4 landscape
  doc.addImage(backgroundBase64, "JPEG", 0, 0, 297, 210);

  // 🧾 Nombre
  doc.setFont("times", "bold");
  doc.setFontSize(28);
  doc.setTextColor(20, 20, 20);
  doc.text(nombre_contratista, 200, 105, { align: "center" });

  // 📘 Curso
doc.setFont("times", "bold");
doc.setFontSize(22);
doc.setTextColor(20, 20, 20);

const maxWidth = 160; // ancho máximo permitido (ajusta según tu diseño)
const textoCurso = `"${nombre_curso}"`;

const lineas = doc.splitTextToSize(textoCurso, maxWidth);

doc.text(lineas, 195, 145, { align: "center" });

  // 📅 Fecha
  doc.setFont("times", "italic");
  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.text(
    `Fecha de emisión: ${new Date().toLocaleDateString()}`,
    195,
    165,
    { align: "center" }
  );

  doc.save(`Certificado_${nombre_contratista}.pdf`);
};


const CertificateDownloadButton: React.FC<CertificateDownloadButtonProps> = ({
  nombre_contratista,
  nombre_curso,
}) => {
const handleDownloadCertificate = async () => {
  if (nombre_contratista && nombre_curso) {
    await generateCertificate(nombre_contratista, nombre_curso);
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
