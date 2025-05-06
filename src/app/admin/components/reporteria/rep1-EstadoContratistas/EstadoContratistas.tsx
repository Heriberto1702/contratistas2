"use client";

import { useEffect, useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  BarElement,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import * as XLSX from "xlsx";
import styles from "./EstadoContratistas.module.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale
);

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
    labels: ["Contratistas"],
    datasets: [
      {
        label: "Activos",
        data: [totalActivos],
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
      {
        label: "Inactivos",
        data: [totalInactivos],
        backgroundColor: "#FF9800",
        borderColor: "#F57C00",
        borderWidth: 1,
      },
    ],
  };

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: {
        display: true,
        text: "Contratistas Activos vs Inactivos",
        color: "#333",
        font: { size: 18 },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: "#333" } },
      x: { ticks: { color: "#333" } },
    },
  };

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

  const nuevosPorMesData = {
    labels: data.nuevosPorMes.map((item: any) => item.mes),
    datasets: [
      {
        label: "Contratistas  Logueados",
        data: data.nuevosPorMes.map((item: any) => item.cantidad),
        fill: false,
        backgroundColor: "#673AB7",
        borderColor: "#9575CD",
        tension: 0.3,
      },
    ],
  };

  const nuevosPorMesOptions = {
    responsive: true,
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        backgroundColor: "#311B92",
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => ` ${context.parsed.y} nuevos`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 5,
          color: "#333",
        },
      },
      x: {
        ticks: {
          color: "#333",
          callback: function (_: any, index: number) {
            return nuevosPorMesData.labels[index];
          },
        },
      },
    },
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    const resumen = [
      ["Estado", "Cantidad"],
      ["Activos", totalActivos],
      ["Inactivos", totalInactivos],
    ];
    const ws1 = XLSX.utils.aoa_to_sheet(resumen);
    XLSX.utils.book_append_sheet(wb, ws1, "Resumen");

    const porTipo = [["Tipo", "Cantidad"]];
    data.distribucionTipo.forEach((item: any) => {
      porTipo.push([item.tipo, item.cantidad]);
    });
    const ws2 = XLSX.utils.aoa_to_sheet(porTipo);
    XLSX.utils.book_append_sheet(wb, ws2, "PorTipo");

    const porClub = [["Club", "Cantidad"]];
    Object.entries(data.segmentacionClub).forEach(([club, cantidad]) => {
      porClub.push([club, String(cantidad)]);
    });
    const ws3 = XLSX.utils.aoa_to_sheet(porClub);
    XLSX.utils.book_append_sheet(wb, ws3, "PorClub");

    const porMes = [["Mes", "Cantidad"]];
    data.nuevosPorMes.forEach((item: any) => {
      porMes.push([item.mes, item.cantidad]);
    });
    const ws4 = XLSX.utils.aoa_to_sheet(porMes);
    XLSX.utils.book_append_sheet(wb, ws4, "NuevosPorMes");

    XLSX.writeFile(wb, "ReporteContratistas.xlsx");
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>📊 Reportes de Contratistas</h2>
        <button onClick={exportToExcel} className={styles.excelButton}>
          Descargar Excel 📥
        </button>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.reporte}>
          <h3>📈 Total de Contratistas</h3>
          <Bar data={totalContratistas} options={optionsBar} />
        </div>

        <div className={styles.reporte}>
          <h3>📈 Tipo de Contratista</h3>
          <Pie data={distribucionTipo} />
        </div>

        <div className={styles.reporte}>
          <h3>📈Segmentación por Tipo Club</h3>
          <Pie data={segmentacionClub} />
        </div>

        <div className={styles.reporte}>
          <h3>📈 Dados de alta en Nueva Plataforma Web</h3>
          <Line data={nuevosPorMesData} options={nuevosPorMesOptions} />
        </div>
      </div>
    </div>
  );
}
