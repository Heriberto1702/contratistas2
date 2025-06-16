"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import BeneficioContratista from "./BeneficioContratista";
import BannerStatic from "../BannerEstatico/BannerStatic";
import Breadcrumbs from "../Breadcrumbs/breadcrumbs";
import NavBar from "../navbar/NavBar";

const BeneficioPageClient = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get("nivel");

  const convertirRango = (valor: string | null) => {
    if (valor === "oro") return "Gold";
    if (valor === "plata") return "Platinum";
    if (valor === "bronce") return "Bronze";
    return "";
  };

  const nombreClub = convertirRango(params);

  return (
    <>
      <NavBar />
      <BannerStatic images={["/banner3.png"]} />
      <Breadcrumbs />
      <BeneficioContratista nombreClub={nombreClub} />
    </>
  );
};

export default BeneficioPageClient;
