"use client";

import Link from "next/link";
import GaleriaAdmin from "../components/galeria/Galeria";

const AdminDashboardGaleria = () => {
  return (
    <div className="p-8">
      <Link href="/admin">
        <p className="text-blue-600">← Volver al Dashboard</p>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Administración de Galeria</h1>
      <GaleriaAdmin />
    </div>
  );
};

export default AdminDashboardGaleria;
