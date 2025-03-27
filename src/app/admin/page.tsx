"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "./AdminPage.css";
import Image from "next/image";

const AdminPage = () => {
  const router = useRouter();
  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Panel del Administrador</h1>
      </header>
      <h1 className="titulo">Seleccione la opción que desea administrar:</h1>
      <main className="admin-main">
        <button
          className="admin-button blue"
          onClick={() => handleRedirect("/admin/cursos")}
        >
          <span className="icon">
            <Image
              src="/icons/diploma.png"
              alt="Cursos"
              width={30}
              height={30}
            />
          </span>
          <span>Agregar Cursos</span>
        </button>
        <button
          className="admin-button green"
          onClick={() => handleRedirect("/admin/eventos")}
        >
          <span className="icon">
            <Image
              src="/icons/evento.png"
              alt="Eventos"
              width={30}
              height={30}
            />
          </span>
          <span>Agregar Eventos</span>
        </button>
        <button
          className="admin-button red"
          onClick={() => handleRedirect("/admin/galeria")}
        >
          <span className="icon">
            <Image
              src="/icons/evento.png"
              alt="Galeria"
              width={30}
              height={30}
            />
          </span>
          <span>Agregar Fotos</span>
        </button>
      </main>
    </div>
  );
};

export default AdminPage;
