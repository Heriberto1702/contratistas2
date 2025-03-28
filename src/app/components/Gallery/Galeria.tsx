"use client";

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
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!categoria) return;

    const fetchImagenes = async () => {
      try {
        const response = await fetch(`/api/fotos?categoria=${categoria}`);
        const data = await response.json();

        if (data.error) {
          setError(data.error);
          setImagenes([]);
        } else {
          setImagenes(data.galleryImages);
        }
      } catch (err) {
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

  return (
    <div>
    <h3 className="font-bold mb-2">Galería de {categoria}</h3>

    <div className={styles.galeriaContainer}>
      {imagenes.map((imagen, index) => (
        <Image
          key={index}
          src={imagen}
          width={150}
          height={150}
          alt={`Imagen ${index + 1}`}
          className={styles.galeriaItem}
          onClick={() => setImagenSeleccionada(imagen)}
        />
      ))}
    </div>

    {/* Popup de imagen */}
    {imagenSeleccionada && (
      <div className={styles.popupOverlay} onClick={() => setImagenSeleccionada(null)}>
        <button className={styles.closeBtn} onClick={() => setImagenSeleccionada(null)}>
          ✖
        </button>
        <Image
          src={imagenSeleccionada}
          width={800}
          height={600}
          alt="Imagen grande"
          className={`${styles.popupImg} ${zoom ? styles.zoomed : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setZoom(!zoom);
          }}
        />
      </div>
    )}
  </div>
);
};

export default Galeria;
