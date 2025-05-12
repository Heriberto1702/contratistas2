import React, { useState, useEffect } from "react";
import styles from "./Galeria.module.css";
import Cargando from "@/app/components/Cargando/Cargando";
import Image from "next/image";

interface Categoria {
  id_categoria: number;
  nombre_categoria: string;
  imagen_principal: string;
  imagenes: Imagen[];
}

interface Imagen {
  id_imagen: number;
  id_categoria: number;
  url_imagen: string;
  nombre_archivo: string;
}

export default function GaleriaAdmin() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(
    null
  );
  const [newCategoria, setNewCategoria] = useState({
    nombre_categoria: "",
    imagen_principal: null as File | null,
  });
  const [newImagenes, setNewImagenes] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Cargar categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("/api/galeria/galeriaCategoria");
        if (!response.ok) throw new Error("Error al cargar categorías");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        setError("Error al cargar las categorías");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  // Manejar subida de nueva categoría
  const handleCategoriaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsUploading(true);

    if (!newCategoria.imagen_principal) {
      setError("Por favor selecciona una imagen principal");
      setIsUploading(false);
      return;
    }

    // Verificar el tamaño de la imagen (5MB máximo)
    const maxSize = 5 * 1024 * 1024;
    if (newCategoria.imagen_principal.size > maxSize) {
      setError("La imagen es demasiado grande. Tamaño máximo permitido: 5MB");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("nombre_categoria", newCategoria.nombre_categoria);
    formData.append("imagen_principal", newCategoria.imagen_principal);

    try {
      const response = await fetch("/api/galeria/galeriaCategoria", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear categoría");
      }

      const nuevaCategoria = await response.json();
      setCategorias([...categorias, nuevaCategoria]);

      // Limpiar formulario
      setNewCategoria({
        nombre_categoria: "",
        imagen_principal: null,
      });
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "Error al crear la categoría"
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Manejar eliminación de categoría
  const handleDeleteCategoria = async (id_categoria: number) => {
    if (
      !confirm(
        "¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/galeria/galeriaCategoria`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_categoria }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar categoría");
      }

      // Actualizar el estado removiendo la categoría eliminada
      setCategorias(
        categorias.filter((cat) => cat.id_categoria !== id_categoria)
      );
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Error al eliminar la categoría"
      );
    }
  };

  // Manejar subida de nuevas imágenes
  const handleImagenesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsUploading(true);

    if (!selectedCategoria || newImagenes.length === 0) {
      setError("Por favor selecciona una categoría y al menos una imagen");
      setIsUploading(false);
      return;
    }

    // Verificar el tamaño de cada imagen
    const maxSize = 5 * 1024 * 1024;
    const oversizedImages = newImagenes.filter((img) => img.size > maxSize);
    if (oversizedImages.length > 0) {
      setError(
        `Las siguientes imágenes son demasiado grandes (máximo 5MB): ${oversizedImages
          .map((img) => img.name)
          .join(", ")}`
      );
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("id_categoria", selectedCategoria.toString());
    newImagenes.forEach((imagen) => {
      formData.append("imagenes", imagen);
    });

    try {
      const response = await fetch("/api/galeria/galeriaImagen", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al subir imágenes");
      }

      const nuevasImagenes = await response.json();

      // Actualizar la categoría con las nuevas imágenes
      setCategorias(
        categorias.map((cat) =>
          cat.id_categoria === selectedCategoria
            ? { ...cat, imagenes: [...(cat.imagenes || []), ...nuevasImagenes] }
            : cat
        )
      );

      // Limpiar formulario
      setNewImagenes([]);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "Error al subir las imágenes"
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Manejar eliminación de imagen
  const handleDeleteImagen = async (id_imagen: number) => {
    try {
      const response = await fetch("/api/galeria/galeriaImagen", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_imagen }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar imagen");
      }

      // Actualizar el estado removiendo la imagen eliminada
      setCategorias(
        categorias.map((cat) => ({
          ...cat,
          imagenes: (cat.imagenes || []).filter(
            (img) => img.id_imagen !== id_imagen
          ),
        }))
      );
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "Error al eliminar la imagen"
      );
    }
  };

  if (loading) return <Cargando />;

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.divider}>
        {/* Formulario para nueva categoría */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Crear Nueva Categoría</h2>
          <form onSubmit={handleCategoriaSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="nombre_categoria">Nombre de la Categoría:</label>
              <input
                type="text"
                id="nombre_categoria"
                value={newCategoria.nombre_categoria}
                onChange={(e) =>
                  setNewCategoria({
                    ...newCategoria,
                    nombre_categoria: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="imagen_principal">Imagen Principal:</label>
              <input
                type="file"
                id="imagen_principal"
                accept="image/*"
                onChange={(e) =>
                  setNewCategoria({
                    ...newCategoria,
                    imagen_principal: e.target.files?.[0] || null,
                  })
                }
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isUploading}
            >
              {isUploading ? "Subiendo..." : "Crear Categoría"}
            </button>
          </form>
        </section>

        {/* Formulario para subir imágenes */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Subir Imágenes</h2>
          <form onSubmit={handleImagenesSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="categoria">Seleccionar Categoría:</label>
              <select
                id="categoria"
                value={selectedCategoria || ""}
                onChange={(e) => setSelectedCategoria(Number(e.target.value))}
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id_categoria} value={cat.id_categoria}>
                    {cat.nombre_categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="imagenes">Seleccionar Imágenes:</label>
              <input
                type="file"
                id="imagenes"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setNewImagenes(Array.from(e.target.files || []))
                }
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isUploading}
            >
              {isUploading ? "Subiendo..." : "Subir Imágenes"}
            </button>
          </form>
        </section>
      </div>

      {/* Lista de categorías y sus imágenes */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Categorías e Imágenes</h2>
        <div className={styles.categoriasGrid}>
          {categorias.map((categoria) => (
            <div key={categoria.id_categoria} className={styles.categoriaCard}>
              <div className={styles.categoriaHeader}>
                <h3>{categoria.nombre_categoria}</h3>
                <button
                  onClick={() => handleDeleteCategoria(categoria.id_categoria)}
                  className={styles.deleteCategoriaButton}
                  title="Eliminar categoría"
                >
                  ❌
                </button>
              </div>
              <div className={styles.imagenContainer}>
                <Image
                  width={1000}
                  height={1000}
                  src={categoria.imagen_principal}
                  alt={categoria.nombre_categoria}
                  className={styles.categoriaImagen}
                />
              </div>
              <div className={styles.imagenesGrid}>
                {categoria.imagenes?.length > 0 ? (
                  categoria.imagenes.map((imagen) => (
                    <div key={imagen.id_imagen} className={styles.imagenCard}>
                      <Image
                        width={100}
                        height={100}
                        src={imagen.url_imagen}
                        alt={imagen.nombre_archivo}
                        className={styles.imagenThumbnail}
                      />
                      <button
                        onClick={() => handleDeleteImagen(imagen.id_imagen)}
                        className={styles.deleteButton}
                        title="Eliminar imagen"
                      >
                        X
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No hay imágenes en esta categoría</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
