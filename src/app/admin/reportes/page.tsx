'use client';
import React from 'react';
import Link from "next/link";
import EstadoContratistas from '../components/reporteria/rep1-EstadoContratistas/EstadoContratistas';
import AsistenciaEventos from '../components/reporteria/rep2-AsistenciaEventos/AsistenciaEventos';
import CursosPorUsuario from '../components/reporteria/rep3-CursosAsistidos/CursosPorUsuario';
import styles from './ReportesPage.module.css';
import CursosPopulares from '../components/reporteria/rep3-CursosAsistidos/CursosPopulares';

const ReportesPage = () => {
  return (
    <main className={styles.container}>
      <Link href="/admin">
        <p className={styles.backLink}>← Volver al Dashboard</p>
      </Link>

      <h1 className={styles.title}>Panel de Reportes</h1>

      <div className={styles.section}>
        <EstadoContratistas />
      </div>

      <div className={styles.section}>
        <AsistenciaEventos />
      </div>

      <div className={styles.section}>
        <CursosPopulares/>
      </div>

      <div className={styles.section}>
        <CursosPorUsuario/>
      </div>
    </main>
  );
};

export default ReportesPage;
