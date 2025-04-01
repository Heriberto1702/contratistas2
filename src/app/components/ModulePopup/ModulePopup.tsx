"use client";
import React from "react";
import styles from "./ModulePopup.module.css";

interface ModulePopupProps {
  module: {
    id_modulo: string;
    titulo_modulo: string;
    contenido: string; // Puede ser un enlace de video o una ruta de archivo MP4
  };
  onClose: () => void;
}

const getEmbedUrl = (url: string): string => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : "";
  } else if (url.includes("sharepoint.com")) {
    return url;
  } else if (url.endsWith(".mp4")) {
    if (url.includes("contratistas-mercadeo.s3.")) {
      return url; // AWS S3 URL
    }
    return `/cursos/${url}`; // Ruta relativa al directorio public/cursos/
  }
  return "";
};

const ModulePopup: React.FC<ModulePopupProps> = ({ module, onClose }) => {
  const embedUrl = getEmbedUrl(module.contenido);

  const isYouTube = embedUrl.includes("youtube.com");
  const isSharePoint = embedUrl.includes("sharepoint.com");
  const isMP4 = embedUrl.endsWith(".mp4");
  const isAWS = embedUrl.includes("contratistas-mercadeo.s3.");

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <p className={styles.title}>{module.titulo_modulo}</p>
        {isYouTube && (
          <div className={styles.videoContainer}>
            <iframe
              src={`${embedUrl}?autoplay=0&rel=0&modestbranding=1&showinfo=0&disablekb=1`}
              title={`Video del módulo: ${module.titulo_modulo}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
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
        {(isMP4 || isAWS) && (
          <div className={styles.videoContainer}>
            <video
              src={embedUrl}
              controls
              className={styles.video}
              title={`Video del módulo: ${module.titulo_modulo}`}
            ></video>
          </div>
        )}
        {!isYouTube && !isSharePoint && !isMP4 && !isAWS && (
          <p>El enlace del video no es válido o no está disponible.</p>
        )}
      </div>
    </div>
  );
};

export default ModulePopup;
