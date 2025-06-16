import React, { Suspense } from "react";
import BeneficiosPageClient from "@/app/components/BeneficioContratista/BeneficioPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando beneficios...</div>}>
  return <BeneficiosPageClient />;
    </Suspense>
  );
}
