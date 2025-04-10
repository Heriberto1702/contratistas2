"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface FotosCategoriaProps {
  folder: string;
}

const FotosCategoria = ({ folder }: FotosCategoriaProps) => {
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // Cambié el estado a 'false' por defecto
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si la carpeta no está definida, no hacemos nada
    if (!folder) return;

    // Restablecer los estados antes de la nueva solicitud
    setMainImage(null);
    setGalleryImages([]);
    setError(null);
    setLoading(true); // Activar el estado de carga

    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/galeria/fotosGaleria?folder=${folder}`);
        const data = await response.json();

        if (response.ok) {
          setMainImage(data.mainImage); // Establecer foto principal
          setGalleryImages(data.galleryImages); // Establecer las imágenes de la galería
        } else {
          setError(data.error || "No se encontraron imágenes.");
        }
      } catch (err) {
        setError("Error al cargar las imágenes.");
      } finally {
        setLoading(false); // Desactivar el estado de carga cuando termine
      }
    };

    fetchImages();
  }, [folder]); // Se ejecuta cada vez que cambia la carpeta

  // Mostrar "Cargando..." mientras se obtienen los datos
  if (loading) return <p>Cargando imágenes...</p>;

  // Si hay un error, mostrarlo
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-bold mb-2">Fotos de la categoría: {folder}</h3>

      {/* Mostrar Foto Principal */}
      {mainImage ? (
        <div className="mb-4">
          <h4 className="font-semibold">Foto Principal</h4>
          <Image src={mainImage} width={287} height={288} alt="Imagen Principal" className="object-cover rounded-md"/>
        </div>
      ) : (
        <p className="text-gray-500">No hay foto principal</p>
      )}

      {/* Mostrar Galería */} 
      <div>
        <h4 className="font-semibold">Galería</h4>
        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-5 gap-2">
            {galleryImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={287}
                height={288}
                alt={`Imagen ${index + 1}`}
                className="w-full object-cover rounded-md"
                />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay imágenes en la galería</p>
        )}
      </div>
    </div>
  );
};

export default FotosCategoria;
