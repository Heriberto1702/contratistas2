"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const AdminPage = () => {
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "20px",
        backgroundColor: "#f3f4f6",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
        Panel de Administración
      </h1>
      <button
        onClick={() => handleRedirect("/admin/cursos")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1d4ed8",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Ir a Cursos
      </button>
      <button
        onClick={() => handleRedirect("/admin/eventos")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Ir a Eventos
      </button>
    </div>
  );
};

export default AdminPage;
