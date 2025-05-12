"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cargando from "@/app/components/Cargando/Cargando";
import { motion } from "framer-motion";
import "./AdminPage.css";
import logo from "/public/logoContratista.png"; // Asegúrate de que la ruta sea correcta

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
            setUserRole(role);
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

  const buttons = [
    {
      label: "Agregar Cursos",
      path: "/admin/cursos",
      icon: "/icons/diploma.png",
      color: "blue",
    },
    {
      label: "Agregar Eventos",
      path: "/admin/eventos",
      icon: "/icons/evento.png",
      color: "green",
    },
    {
      label: "Generar Reportes",
      path: "/admin/reportes",
      icon: "/icons/reports.png",
      color: "purple",
    },
  ];

  if (userRole === "SUPERUSER") {
    buttons.push(
      {
        label: "Agregar Fotos",
        path: "/admin/galeria",
        icon: "/icons/gallery.png",
        color: "orange",
      },
      {
        label: "Agregar Usuarios",
        path: "/admin/usuario",
        icon: "/icons/team.png",
        color: "gray",
      }
    );
  }

  return (
    <div className="admin-container">
      {isAuthorized ? (
        <>
          <motion.header
            className="admin-hero"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
             <Image src={logo} alt="Logo" width={182} height={119} className="logo" />
            <h1>Panel de Administración</h1>
            <p>Bienvenido <b>{userRole}</b>, gestiona el sistema de Club de Contratistas desde aquí con las siguientes opciones:</p>
          </motion.header>

          <motion.main
            className="admin-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {buttons.map((btn, index) => (
              <motion.button
                key={btn.path}
                className={`admin-tile ${btn.color}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => handleRedirect(btn.path)}
              >
                <Image src={btn.icon} alt={btn.label} width={60} height={60} />
                <span>{btn.label}</span>
              </motion.button>
            ))}
          </motion.main>
        </>
      ) : (
        <div className="loading">
          <h2 className="cargando">Validando Acceso...</h2>
          <Cargando />
        </div>
      )}
           <Link href="/">
        <p className="url">❌ Salir del administrador →</p>
      </Link>
    </div>
  );
};

export default AdminPage;
