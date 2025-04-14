"use client";
import React, { useState } from "react";
import styles from "./Modulov2.module.css";

interface Modulov2Props {
  title?: string;
  imageUrl: string;
  text: string;
  urlExcel: string;
  linkText?: string;
  text2?: string;
}

const Modulov2: React.FC<Modulov2Props> = ({
  title,
  imageUrl,
  text,
  text2,
  urlExcel,
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
        }}
        role="region" // Añadido para accesibilidad
        aria-labelledby="moduleTitle" // Asociamos el título al contenedor
      >
        {title && <h2 id="moduleTitle" className={styles.title}>{title}</h2>}
        <button 
          className={styles.button} 
          onClick={openModal} 
          aria-label="Ver detalles del módulo"
        >
          {linkText || "Abrir detalles"}
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.encabezado}>
              <h3>{title}</h3>
              <button
                className={styles.closeButton}
                onClick={closeModal}
                aria-label="Cerrar modal"
              >
                &#88;
              </button>
            </div>
            <p className={styles.Text}>{text}</p>
            {text2 && <p className={styles.Text}>{text2}</p>}
            <div className={styles.botones}>
              <button
                className={styles.buttonModal}
                onClick={() => window.open(urlExcel)}
                aria-label="Descargar archivo Excel"
              >
                Descargar Excel &#10095;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modulov2;
