"use client";
import React, { useState } from "react";
import styles from "./Modulov2.module.css";

interface Modulov2Props {
  title?: string;
  imageUrl: string;
  text: string;
  urlPDF: string;
  urlExcel: string;
  urlExample: string;
  linkText?: string;
  text2?:string;
}

const Modulov2: React.FC<Modulov2Props> = ({
  title,
  imageUrl,
  text,
  text2,
  urlPDF,
  urlExcel,
  urlExample,
  linkText,
  
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "200px",
        }}
      >
        {title && <h2 className={styles.title}>{title}</h2>}
        <button className={styles.button} onClick={openModal}>
          {linkText || "Abrir detalles"}
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.encabezado}>
              <h3>{title}</h3>
              <button className={styles.closeButton} onClick={closeModal}>
                &#88;
              </button>
            </div>
            <p className={styles.Text}>{text}</p>
            <p className={styles.Text}>{text2}</p>
            <div className={styles.botones}>
              <button
                className={styles.buttonModal}
                onClick={() => window.open(urlPDF)}
              >
                Descargar PDF &#10095;{" "}
              </button>
              <button
                className={styles.buttonModal}
                onClick={() => window.open(urlExcel)}
              >
                Descargar Excel &#10095;
              </button>
              <button
                className={styles.buttonModal}
                onClick={() => window.open(urlExample)}
              >
                Descargar Ejemplo &#10095;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modulov2;
