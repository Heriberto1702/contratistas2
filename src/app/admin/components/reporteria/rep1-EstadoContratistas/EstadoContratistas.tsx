"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Importamos dynamic de Next.js
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

export default function EstadoContratistas() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartsLoaded, setChartsLoaded] = useState(false);

  // Cargar gráficos solo después de que se haya cargado el cliente
  const PieChart = dynamic(() => import("react-chartjs-2").then(mod => mod.Pie), { ssr: false });
  const BarChart = dynamic(() => import("react-chartjs-2").then(mod => mod.Bar), { ssr: false });
  const LineChart = dynamic(() => import("react-chartjs-2").then(mod => mod.Line), { ssr: false });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/reporteria/contratistas");
        const jsonData = await response.json();
        console.log("Datos obtenidos:", jsonData); // Verificar si los datos se reciben correctamente
        setData(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Asegura que los gráficos se carguen solo después de que el cliente haya cargado el componente
    if (!chartsLoaded && data) {
      setChartsLoaded(true);
      console.log("Gráficos listos para cargar"); // Verificar si los gráficos se cargan
    }
  }, [data, chartsLoaded]);

  if (loading) return <Cargando />;

  // Verificar si los datos están completos y tienen el formato adecuado
  const { activos, inactivos, distribucionTipo, segmentacionClub, nuevosPorMes } = data || {};

  if (!activos || !inactivos || !distribucionTipo || !segmentacionClub || !nuevosPorMes) {
    console.error("Los datos no están completos:", data);
  }

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
        ticks: {
          stepSize: 10,
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
    labels: distribucionTipo.map((item: any) => item.tipo),
    datasets: [
      {
        data: distribucionTipo.map((item: any) => item.cantidad),
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
    labels: nuevosPorMes.map((item: any) => item.mes),
    datasets: [
      {
        label: "Contratistas Logueados",
        data: nuevosPorMes.map((item: any) => item.cantidad),
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
    distribucionTipo.forEach((item: any) => tipoSheet.push([item.tipo, item.cantidad]));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(tipoSheet), "PorTipo");

    // Por Club
    const clubSheet = [["Club", "Cantidad"]];
    Object.entries(segmentacionClub).forEach(([club, cantidad]) =>
      clubSheet.push([club, String(cantidad)])
    );
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(clubSheet), "PorClub");

    // Nuevos por Mes
    const mesSheet = [["Mes", "Cantidad"]];
    nuevosPorMes.forEach((item: any) => mesSheet.push([item.mes, item.cantidad]));
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
        {chartsLoaded && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
