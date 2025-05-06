'use client';
import React from 'react';
import EstadoContratistas from '../components/reporteria/rep1-EstadoContratistas/EstadoContratistas'
import AsistenciaEventos from '../components/reporteria/rep1-EstadoContratistas/AsistenciaEventos';

const ReportesPage = () => {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Panel de Reportes</h1>
      
      {/* Componente: Activos vs Inactivos */}
      <EstadoContratistas />
      <AsistenciaEventos />
    </main>
  );
};

export default ReportesPage;
