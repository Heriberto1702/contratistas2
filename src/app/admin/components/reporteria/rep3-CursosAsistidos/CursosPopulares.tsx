"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./CursosPopulares.module.css";
import Cargando from "@/app/components/Cargando/Cargando";
import * as XLSX from "xlsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Curso = {
  id: number;
  nombre: string;
  total_inscritos: number;
};

export default function CursosPopulares() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reporteria/cursos")
      .then((res) => res.json())
      .then((data) => {
        setCursos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const colores = [
    "#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f",
    "#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#bab0ab"
  ];

  const chartData = {
    labels: cursos.map((curso) => curso.nombre),
    datasets: [
      {
        label: "Contratistas inscritos",
        data: cursos.map((curso) => curso.total_inscritos),
        backgroundColor: cursos.map((_, i) => colores[i % colores.length]),
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };
  if (loading) {
    return (
     <Cargando/>
    );
  }

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
  
    // Hoja 1: Resumen de cursos
    const resumenCursos = [
      ["Curso", "Total de Contratistas Inscritos"],
      ...cursos.map((curso) => [curso.nombre, curso.total_inscritos]),
    ];
    const ws1 = XLSX.utils.aoa_to_sheet(resumenCursos);
    XLSX.utils.book_append_sheet(wb, ws1, "ResumenCursos");
  
    // Si más adelante tenés datos detallados por contratista, podés agregar otra hoja aquí
  
    // Guardar archivo
    XLSX.writeFile(wb, "Reporte_Cursos_Populares.xlsx");
  };
  
  return (
    <div className={styles.container}>
        <>
        <div className={styles.header}>
        <h2 className={styles.title}>📊 Cursos y contratistas inscritos</h2>
        <button onClick={exportToExcel} className={styles.excelButton}>
          Descargar Excel 📥
        </button>
        </div>
        <Bar data={chartData} options={chartOptions} />
          <p className={styles.legend}> Cantidad de contratistas inscritos</p>
        </>
      
    </div>
  );
}
