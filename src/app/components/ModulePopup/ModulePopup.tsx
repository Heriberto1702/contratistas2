"use client";
import React from "react";
import styles from "./ModulePopup.module.css";

interface ModulePopupProps {
  module: {
    id_modulo: string;
    titulo_modulo: string;
    contenido: string; // El enlace del video
  };
  onClose: () => void;
}

const getEmbedUrl = (url: string): string => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
  } else if (url.includes("sharepoint.com")) {
    const sharepointMatch = url.match(/https:\/\/[\w.-]+\/sites\/[\w.-]+\/Shared%20Documents\/([\w%.-]+)/);
    if (sharepointMatch) {
      return url; // Devuelve el enlace tal como está
    }
  }
  return ""; // Si no es un enlace válido
};

const ModulePopup: React.FC<ModulePopupProps> = ({ module, onClose }) => {
  const embedUrl = getEmbedUrl(module.contenido);

  const isYouTube = embedUrl.includes("youtube.com");
  const isSharePoint = embedUrl.includes("sharepoint.com");

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h3>{module.titulo_modulo}</h3>
        {isYouTube && (
          <div className={styles.videoContainer}>
            <iframe
              src={embedUrl}
              title={`Video del módulo: ${module.titulo_modulo}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            ></iframe>
          </div>
        )}
        {isSharePoint && (
          <div className={styles.videoContainer}>
            <video
              src={embedUrl}
              controls
              className={styles.video}
              title={`Video del módulo: ${module.titulo_modulo}`}
            ></video>
          </div>
        )}
        {!isYouTube && !isSharePoint && <p>El enlace del video no es válido o no está disponible.</p>}
      </div>
    </div>
  );
};

export default ModulePopup;
