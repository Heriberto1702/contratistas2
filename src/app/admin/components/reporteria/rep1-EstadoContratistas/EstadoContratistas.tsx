"use client";

import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  BarElement,
  LinearScale,
} from "chart.js";
import styles from "./EstadoContratistas.module.css";

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

export default function ContratistasReportes() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/reporteria/contratistas");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;

  const totalActivos = data.activos;
  const totalInactivos = data.inactivos;
  const totalContratistas = {
    labels: ['Contratistas'],
    datasets: [
      {
        label: 'Activos',
        data: [totalActivos],
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
      {
        label: 'Inactivos',
        data: [totalInactivos],
        backgroundColor: '#FF9800',
        borderColor: '#F57C00',
        borderWidth: 1,
      },
    ],
  };
  

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#333',
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: 'Contratistas Activos vs Inactivos',
        color: '#333',
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 50,
          color: '#333',
          font: { size: 13 },
        },
      },
      x: {
        ticks: {
          color: '#333',
          font: { size: 13 },
        },
      },
    },
  };

  // Pie: Distribución por tipo de contratista
  const distribucionTipo = {
    labels: data.distribucionTipo.map((item: { tipo: string }) => item.tipo),
    datasets: [
      {
        data: data.distribucionTipo.map((item: { cantidad: number }) => item.cantidad),
        backgroundColor: ["#03A9F4", "#E91E63"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  // Pie: Segmentación por club
  const segmentacionClub = {
    labels: Object.keys(data.segmentacionClub),
    datasets: [
      {
        data: Object.values(data.segmentacionClub),
        backgroundColor: ["#FF8A65", "#81C784", "#64B5F6"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={styles.card}>
      <h2>📊 Reportes de Contratistas</h2>

      <div className={styles.gridsContainer}>
        {/* Gráfico de Barras: Activos vs Inactivos */}
        <div className={styles.reporte}>
          <h3>Total de Contratistas</h3>
          <Bar data={totalContratistas} options={optionsBar} />
        </div>

        {/* Pie: Distribución por Tipo */}
        <div className={styles.reporte}>
          <h3>Distribución por Tipo de Contratista</h3>
          <Pie data={distribucionTipo} />
        </div>

        {/* Pie: Segmentación por Club */}
        <div className={styles.reporte}>
          <h3>Segmentación por Club</h3>
          <Pie data={segmentacionClub} />
        </div>
      </div>
    </div>
  );
}
