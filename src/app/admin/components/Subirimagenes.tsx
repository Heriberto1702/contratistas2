"use client";

import { useState } from "react";

const Subirimagenes = ({ folder }: { folder: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Selecciona un archivo.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    setIsLoading(true);

    try {
      const response = await fetch("/api/cargarImagen", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (data.url) {
        alert("Imagen subida con éxito!");
      } else if (data.message) {
        alert("Archivo ZIP subido y extraído correctamente.");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error en la subida:", error);
      alert("Error al subir el archivo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-bold mb-2">Subir archivo en: {folder}</h3>
      <input type="file" accept="image/*,.zip" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        disabled={isLoading}
        className={`mt-2 px-4 py-2 rounded ${
          isLoading ? "bg-gray-400" : "bg-blue-500 text-white"
        }`}
      >
        {isLoading ? "Subiendo..." : "Subir Archivo"}
      </button>
    </div>
  );
};

export default Subirimagenes;
