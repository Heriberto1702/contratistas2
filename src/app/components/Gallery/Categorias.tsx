"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Categorias.module.css";
import Cargando from "@/app/components/Cargando/Cargando";

interface Categoria {
  id_categoria: number;
  nombre_categoria: string;
  imagen_principal: string;
}

interface CategoriasProps {
  onSelectCategoria: (categoriaId: number) => void;
}

const Categorias = ({ onSelectCategoria }: CategoriasProps) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("/api/galeria/galeriaCategoria");
        const data = await response.json();

        if (Array.isArray(data)) {
          setCategorias(data);
        } else {
          setError("Error al cargar las categorías.");
        }
      } catch (err) {
        setError("Error al cargar las categorías.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) return <Cargando />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className={styles.categoriasContainer}>
      {categorias.map(({ id_categoria, nombre_categoria, imagen_principal }) => (
        <div
          key={id_categoria}
          className={`${styles.categoriaItem} ${categoriaSeleccionada === id_categoria ? styles.categoriaSeleccionada : ""}`}
          onClick={() => {
            onSelectCategoria(id_categoria);
            setCategoriaSeleccionada(id_categoria);
          }}
        >
          <div className={styles.categoriaImagenWrapper}>
            <Image
              src={imagen_principal}
              alt={nombre_categoria}
              fill
              className={styles.categoriaImagen}
              sizes="120px"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categorias;
