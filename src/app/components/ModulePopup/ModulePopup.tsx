import React from 'react';
import styles from './ModulePopup.module.css'; // Importa el CSS

interface ModulePopupProps {
  module: { title: string; content: string; url: string }; // Añadido el campo url
  onClose: () => void;
}

const ModulePopup: React.FC<ModulePopupProps> = ({ module, onClose }) => {
  // Extraemos el ID del video de la URL de YouTube
  const videoId = module.url.split('v=')[1]?.split('&')[0];

  return (
    <div className={styles.overlay}> {/* Overlay para oscurecer la pantalla */}
      <div className={styles.popup}> {/* Contenido del popup */}
        <button className={styles.closeButton} onClick={onClose}>
          &times; {/* Icono de cerrar */}
        </button>
        <h3>{module.title}</h3>
        <p>{module.content}</p>

        {/* Embed de video de YouTube */}
        {videoId && (
          <div className={styles.videoContainer}>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulePopup;