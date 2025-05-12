"use client";

import Link from "next/link";
import AgregarUsuario from "../components/Agregarusuario";
import "../AdminPage.css";
const AdminDashboardUser = () => {
  return (
    <div className="p-8">
      <Link href="/admin">
        <p className="text-blue-600">← Volver al Dashboard</p>
      </Link>
      <h1 className="text-2xl font-bold mb-4 title2">Administración de Roles de Usuarios</h1>
     <AgregarUsuario/>
    </div>
  );
};

export default AdminDashboardUser;
