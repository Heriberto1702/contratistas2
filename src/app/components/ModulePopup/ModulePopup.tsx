// src/components/ModulePopup/ModulePopup.tsx
"use client";
import React from "react";
import styles from "./ModulePopup.module.css";

interface ModulePopupProps {
  module: { // Actualizamos para coincidir con el objeto pasado
    id_modulo: string;
    titulo_modulo: string;
    contenido: string;

  };
  onClose: () => void;
}

const ModulePopup: React.FC<ModulePopupProps> = ({ module, onClose }) => {
  

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h3>{module.titulo_modulo}</h3> {/* Usamos titulo_modulo */}
        <p>{module.contenido}</p> {/* Usamos contenido */}
      </div>
    </div>
  );
};

export default ModulePopup;
