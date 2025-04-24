"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./AdminPage.css";

const AdminPage = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const validateAccess = async () => {
      try {
        const response = await fetch("/api/usuario/administrador", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();

          const allowedRoles = ["ADMIN", "SUPERUSER"];
          const role = data.role?.toUpperCase();

          if (role && allowedRoles.includes(role)) {
            setIsAuthorized(true);
            setUserRole(role); // Guardamos el rol para condiciones específicas
            return;
          }
        }

        router.push("/");
      } catch (error) {
        console.error("Error al validar el acceso:", error);
        router.push("/");
      }
    };

    validateAccess();
  }, [router]);

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div className="admin-page">
      {isAuthorized ? (
        <>
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
                  src="/icons/gallery.png"
                  alt="Galería"
                  width={30}
                  height={30}
                />
              </span>
              <span>Agregar Fotos</span>
            </button>

            {userRole === "SUPERUSER" && (
              <button
                className="admin-button gray"
                onClick={() => handleRedirect("/admin/usuario")}
              >
                <span className="icon">
                  <Image
                    src="/icons/team.png"
                    alt="Usuarios"
                    width={30}
                    height={30}
                  />
                </span>
                <span>Agregar Usuarios</span>
              </button>
            )}
          </main>
        </>
      ) : (
        <div className="loading">
          <p>Validando acceso...</p>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
