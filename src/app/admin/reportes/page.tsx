'use client';
import React from 'react';
import Link from "next/link";
import EstadoContratistas from '../components/reporteria/rep1-EstadoContratistas/EstadoContratistas'

const ReportesPage = () => {
  return (
   

    <main className="p-6 space-y-6">
       <Link href="/admin">
        <p className="text-blue-600">← Volver al Dashboard</p>  
      </Link>
      <h1 className="text-2xl font-bold">Panel de Reportes</h1>
      
      {/* Componente: Activos vs Inactivos */}
      <EstadoContratistas />
    </main>
  );
};

export default ReportesPage;
