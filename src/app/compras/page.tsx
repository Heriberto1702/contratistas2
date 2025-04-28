"use client"; // 👈 Hace que este componente sea un Client Component

import { useState, useEffect } from "react";
import ComprasContratista from "../components/Compras/ComprasContratista";
import NavBar from "../components/navbar/NavBar";
import BannerSlidernew from "../components/BannerSlidernew/BannerSlidernew";
import Breadcrumbs from "../components/Breadcrumbs/breadcrumbs";
// 🔹 Página de compras (Client Component)
const ComprasPage = () => {
  const images = ["/documentosutiles.png"];
  const [comprasData, setComprasData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchComprasData = async () => {
      try {
        const baseUrl = process.env.NODE_ENV === "production" ? "https://contratistas2.vercel.app/" : "http://localhost:3000";
        const url = `${baseUrl}/api/compras`;

        const response = await fetch(url, {
          method: "GET",
          cache: "no-cache",
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
      } finally {
        setIsLoading(false); // Finalizamos el estado de carga
      }
    }

    fetchComprasData();
  }, []); // 👈 Se ejecuta una sola vez al montar el componente

  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />
      <Breadcrumbs />
      <div>
        {/* Pasamos el estado de carga y los datos de compras al componente ComprasContratista */}
        <ComprasContratista comprasData={comprasData} isLoading={isLoading} />
      </div>
    </>
  );
};

export default ComprasPage;
