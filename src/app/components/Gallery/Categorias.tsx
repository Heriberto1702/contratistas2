"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Categorias.module.css";

interface Categoria {
  nombre: string;
  imagen: string;
}

interface CategoriasProps {
  onSelectCategoria: (categoria: string) => void;
}

const Categorias = ({ onSelectCategoria }: CategoriasProps) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("/api/galeria/categorias");
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setCategorias(data.categorias);
        }
      } catch (err) {
        setError("Error al cargar las categorías.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className={styles.categoriasContainer}>
  {categorias.map(({ nombre, imagen }) => (
    <div
      key={nombre}
      className={`${styles.categoriaItem} ${categoriaSeleccionada === nombre ? styles.categoriaSeleccionada : ""}`}
      onClick={() => {
        onSelectCategoria(nombre);
        setCategoriaSeleccionada(nombre);
      }}
    >
      <div className={styles.categoriaImagenWrapper}>
        <Image
          src={imagen}
          alt={nombre}
          fill
          className={styles.categoriaImagen}
          sizes="120px"
        />
      </div>
      <p className={styles.categoriaNombre}>{nombre}</p>
    </div>
  ))}
</div>

  );
};

export default Categorias;
