"use client"
import React from "react";
import NavBar from "../components/navbar/NavBar";
import BannerStatic from "../components/BannerEstatico/BannerStatic";
import BeneficioContratista from "../components/BeneficioContratista/BeneficioContratista";
import Breadcrumbs from "../components/Breadcrumbs/breadcrumbs";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const rango = searchParams.get("nivel"); // oro | plata | bronce

  const convertirRango = (valor: string | null) => {
    if (valor === "oro") return "Gold";
    if (valor === "plata") return "Platinum";
    if (valor === "bronce") return "Bronze";
    return "";
  };

  const nombreClub = convertirRango(rango);

  return (
    <>
      <NavBar />
      <BannerStatic images={["/banner3.png"]} />
      <Breadcrumbs />
      <BeneficioContratista nombre_club={nombreClub} />
    </>
  );
};

export default Page;
