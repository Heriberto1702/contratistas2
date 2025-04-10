"use client";

import { useState } from "react";

const FolderManager = ({ onFolderCreated }: { onFolderCreated: () => void }) => {
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return alert("El nombre de la carpeta es requerido");

    const response = await fetch("/api/galeria/crearFolder", {
      method: "POST",
      body: JSON.stringify({ folderName }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.message) {
      alert(data.message);
      onFolderCreated(); // Recargar carpetas
      setFolderName("");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="Nombre de la carpeta"
        className="border p-2 rounded w-full"
      />
      <button onClick={handleCreateFolder} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
        Crear Carpeta
      </button>
    </div>
  );
};

export default FolderManager;
