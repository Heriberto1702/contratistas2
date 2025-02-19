"use client"; // 👈 Hace que este componente sea un Client Component

import { useState, useEffect } from "react";
import ComprasContratista from "../components/Compras/ComprasContratista";
import NavBar from "../components/navbar/NavBar";

// 🔹 Página de compras (Client Component)
const ComprasPage = () => {
  const [comprasData, setComprasData] = useState([]);

  useEffect(() => {
    async function fetchComprasData() {
      try {
        const baseUrl = process.env.NODE_ENV === "production" ? "https://contratistas2.vercel.app/" : "http://localhost:3000";
        const url = `${baseUrl}/api/compras`;

        const response = await fetch(url, {
          method: "GET",
          cache: "no-store",
          credentials: "include", // Enviar cookies si es necesario
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Error en la API: ${response.status}`);
        }

        const data = await response.json();
        setComprasData(data);
      } catch (error) {
        console.error("Error obteniendo datos de compras:", error);
        setComprasData([]);
      }
    }

    fetchComprasData();
  }, []); // 👈 Se ejecuta una sola vez al montar el componente

  return (
    <>
      <NavBar />
      <div>
        <ComprasContratista comprasData={comprasData} />
      </div>
    </>
  );
};

export default ComprasPage;
