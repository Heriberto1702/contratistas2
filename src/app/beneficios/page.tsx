"use client"
import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar/NavBar";
import BannerStatic from "../components/BannerEstatico/BannerStatic";
import BeneficioContratista from "../components/BeneficioContratista/BeneficioContratista";
import Breadcrumbs from "../components/Breadcrumbs/breadcrumbs";
const Page = () => {
  const images = ["/banneracademia.png"];
  const [nombreClub, setNombreClub] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await fetch("/api/usuario/contratista"); // Reemplaza con la URL de tu API
        if (!response.ok) throw new Error("Error al obtener el nombre del club");
        const data = await response.json();
        setNombreClub(data.tipo_club); // Asigna el tipo de club al estado
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Al finalizar la llamada, cambia el estado de carga
      }
    };

    fetchClub();
  }, []);

  return (
    <>
      <NavBar />
      <BannerStatic images={["/banner3.png"]} />
      <Breadcrumbs />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <BeneficioContratista nombre_club={nombreClub} />
      )}
    </>
  );
};

export default Page;
