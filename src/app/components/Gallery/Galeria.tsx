import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Galeria.module.css";

interface GaleriaProps {
  categoria: string;
}

const Galeria = ({ categoria }: GaleriaProps) => {
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagenIndex, setImagenIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!categoria) return;
  
    const fetchImagenes = async () => {
      try {
        // Verificar que el parámetro sea un número válido
        const categoriaId = parseInt(categoria);
        if (isNaN(categoriaId)) {
          setError("El ID de la categoría no es válido.");
          setLoading(false);
          return;
        }
  
        // Obtener las imágenes para la categoría
        const response = await fetch(`/api/galeria/galeriaImagen?categoria=${categoriaId}`);
        const data = await response.json();
  
        if (data.error) {
          setError(data.error);
          setImagenes([]);
        } else {
          setImagenes(data.imagenes || []);
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar las imágenes.");
        setImagenes([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchImagenes();
  }, [categoria]);
  

  if (loading) return <p>Cargando imágenes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const navigateImage = (direction: number) => {
    setImagenIndex((prevIndex) => {
      if (prevIndex === null) return null;
      const newIndex = (prevIndex + direction + imagenes.length) % imagenes.length;
      return newIndex;
    });
  };

  return (
    <div>
      <div className={styles.galeriaContainer}>
        {imagenes.map((imagen, index) => (
          <Image
            key={index}
            src={imagen}
            width={1200}
            height={1200}
            alt={`Imagen ${index + 1}`}
            className={styles.galeriaItem}
            onClick={() => setImagenIndex(index)}
          />
        ))}
      </div>

      {/* Popup de imagen */}
      {imagenIndex !== null && (
        <div className={styles.popupOverlay} onClick={() => setImagenIndex(null)}>
          <button className={styles.closeBtn} onClick={() => setImagenIndex(null)}>
            ✖
          </button>

          {/* Flecha izquierda */}
          <button
            className={styles.navBtnLeft}
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
          >
            ◀
          </button>

          <Image
            src={imagenes[imagenIndex]}
            width={1200}
            height={1200}
            loading="lazy"
            alt="Imagen grande"
            className={`${styles.popupImg} ${zoom ? styles.zoomed : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setZoom(!zoom);
            }}
          />

          {/* Flecha derecha */}
          <button
            className={styles.navBtnRight}
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Galeria;
