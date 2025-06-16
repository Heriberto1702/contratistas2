import React, { Suspense } from "react";
import BeneficiosPageClient from "@/app/components/BeneficioContratista/BeneficioPageClient";

export default function Page() {
  return (
    <Suspense>
    <BeneficiosPageClient />
    </Suspense>
  );
}
