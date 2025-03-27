"use client";

import { useState, useEffect } from "react";
import FolderManager from "../components/crearCarpeta"; // Importa FolderManager
import Subirimagenes from "../components/Subirimagenes"; // Importa Subirimagenes
import FotosCategoria from "./FotosCategoria";

const Gallery = () => {
  const [folders, setFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // Obtener las carpetas desde la API al cargar el componente
  useEffect(() => {
    fetch("/api/listaDeCarpetas")
      .then((res) => res.json())
      .then((data) => setFolders(data))
      .catch((error) => console.error("Error al obtener carpetas:", error));
  }, []);

  // Función para actualizar la lista de carpetas después de crear una nueva
  const handleFolderCreated = () => {
    fetch("/api/listaDeCarpetas")
      .then((res) => res.json())
      .then((data) => setFolders(data))
      .catch((error) => console.error("Error al obtener carpetas:", error));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Galería de Imágenes</h2>

      {/* Componente para Crear Carpeta */}
      <FolderManager onFolderCreated={handleFolderCreated} />

      {/* Listado de Carpetas */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {folders.map((folder) => (
          <div
            key={folder}
            onClick={() => setSelectedFolder(folder)}
            className={`p-4 border cursor-pointer rounded ${
              selectedFolder === folder ? "bg-blue-200" : ""
            }`}
          >
            📁 {folder}
          </div>
        ))}
      </div>

      {/* Subir Imagen solo si se ha seleccionado una carpeta */}
      {selectedFolder && <Subirimagenes folder={selectedFolder} />}
     {selectedFolder && <FotosCategoria folder={selectedFolder} />}
    </div>
  );
};

export default Gallery;
