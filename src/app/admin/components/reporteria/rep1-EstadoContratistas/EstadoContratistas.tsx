"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Cargando from "@/app/components/Cargando/Cargando";
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

// Registra los elementos del gráfico
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

interface DistribucionTipo {
  tipo: string;
  cantidad: number;
}

interface SegmentacionClub {
  [key: string]: number;
}

interface NuevosPorMes {
  mes: string;
  cantidad: number;
}

interface Data {
  activos: number;
  inactivos: number;
  distribucionTipo: DistribucionTipo[];
  segmentacionClub: SegmentacionClub;
  nuevosPorMes: NuevosPorMes[];
}

export default function EstadoContratistas() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  const PieChart = dynamic(() => import("react-chartjs-2").then(mod => mod.Pie), { ssr: false });
  const BarChart = dynamic(() => import("react-chartjs-2").then(mod => mod.Bar), { ssr: false });
  const LineChart = dynamic(() => import("react-chartjs-2").then(mod => mod.Line), { ssr: false });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/reporteria/contratistas");
        const jsonData: Data = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Cargando />;

  if (!data) return <div>No se encontraron datos.</div>;

  const { activos, inactivos, distribucionTipo, segmentacionClub, nuevosPorMes } = data;

  // ------------------- Gráfico de Barras -------------------
  const totalContratistas = {
    labels: ["Contratistas"],
    datasets: [
      {
        label: "Activos",
        data: [activos],
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
      {
        label: "Inactivos",
        data: [inactivos],
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
      y: {
        beginAtZero: true,
        min: 0,
        max:  100,
        ticks: {
          stepSize: 1,
          color: "#333",
          font: { size: 13 },
          callback: (value: any) => (Number.isInteger(value) ? value : null),
        },
      },
      x: {
        ticks: {
          color: "#333",
          font: { size: 13 },
        },
      },
    },
  };

  // ------------------- Gráfico Pie Tipo Contratista -------------------
  const tipoContratistaData = {
    labels: distribucionTipo.map((item) => item.tipo),
    datasets: [
      {
        data: distribucionTipo.map((item) => item.cantidad),
        backgroundColor: ["#03A9F4", "#E91E63"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // ------------------- Gráfico Pie Club -------------------
  const clubData = {
    labels: Object.keys(segmentacionClub),
    datasets: [
      {
        data: Object.values(segmentacionClub),
        backgroundColor: ["#FF8A65", "#81C784", "#64B5F6"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // ------------------- Gráfico Línea Nuevos por Mes -------------------
  const nuevosMesData = {
    labels: nuevosPorMes.map((item) => item.mes),
    datasets: [
      {
        label: "Contratistas Logueados",
        data: nuevosPorMes.map((item) => item.cantidad),
        backgroundColor: "#673AB7",
        borderColor: "#9575CD",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const nuevosMesOptions = {
    responsive: true,
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        backgroundColor: "#311B92",
      },
    },
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.y} nuevos`,
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
          callback: (_: any, index: number) => nuevosMesData.labels[index],
        },
      },
    },
  };

  // ------------------- Exportar a Excel -------------------
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    // Resumen Activos/Inactivos
    const resumen = [
      ["Estado", "Cantidad"],
      ["Activos", activos],
      ["Inactivos", inactivos],
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(resumen), "Resumen");

    // Por Tipo
    const tipoSheet = [["Tipo", "Cantidad"]];
    distribucionTipo.forEach((item) => tipoSheet.push([item.tipo, String(item.cantidad)]));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(tipoSheet), "PorTipo");

    // Por Club
    const clubSheet = [["Club", "Cantidad"]];
    Object.entries(segmentacionClub).forEach(([club, cantidad]) =>
      clubSheet.push([club, String(cantidad)])
    );
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(clubSheet), "PorClub");

    // Nuevos por Mes
    const mesSheet = [["Mes", "Cantidad"]];
    nuevosPorMes.forEach((item) => mesSheet.push([item.mes, String(item.cantidad)]));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(mesSheet), "NuevosPorMes");

    XLSX.writeFile(wb, "ReporteContratistas.xlsx");
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>📊 Control de Contratistas</h2>
        <button onClick={exportToExcel} className={styles.excelButton}>
          Descargar Excel 📥
        </button>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.reporte}>
          <h3>📈 Total de Contratistas</h3>
          <BarChart data={totalContratistas} options={optionsBar} />
        </div>

        <div className={styles.reporte}>
          <h3>📊 Tipo de Contratista</h3>
          <PieChart data={tipoContratistaData} />
        </div>

        <div className={styles.reporte}>
          <h3>📊 Segmentación por Club</h3>
          <PieChart data={clubData} />
        </div>

        <div className={styles.reporte}>
          <h3>📈 Nuevos Logueos por Mes</h3>
          <LineChart data={nuevosMesData} options={nuevosMesOptions} />
        </div>
      </div>
    </div>
  );
}
