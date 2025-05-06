import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import styles from "./AsistenciaEventos.module.css";

export default function AsistenciaEventos() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/reporteria/eventos");
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

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  // Ordenar eventos por cantidad de asistentes (mayor a menor)
  const eventosOrdenados = data
    ? [...data].sort((a, b) => b.inscritos.length - a.inscritos.length)
    : [];

  // Paleta de colores para las barras
  const barColors = [
    "#4caf50",
    "#2196f3",
    "#ff9800",
    "#e91e63",
    "#9c27b0",
    "#00bcd4",
    "#ffc107",
    "#8bc34a",
    "#f44336",
    "#607d8b",
  ];
  const backgroundColors = eventosOrdenados.map(
    (_: any, idx: number) => barColors[idx % barColors.length]
  );

  // Datos para el gráfico
  const chartData = {
    labels: eventosOrdenados.map(
      (evento: any) => `${evento.nombre_evento} (${evento.fecha_hora})`
    ),
    datasets: [
      {
        label: "Cantidad de Asistentes",
        data: eventosOrdenados.map((evento: any) => evento.inscritos.length),
        backgroundColor: backgroundColors,
        borderColor: "#388E3C",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Cantidad de personas por evento",
        color: "#333",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#333",
          font: { size: 13 },
          stepSize: 1,
          callback: function (value: any) {
            if (Number.isInteger(value)) return value;
            return null;
          },
        },
      },
      x: { ticks: { color: "#333", font: { size: 13 } } },
    },
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Asistencia a Eventos</h1>

      {eventosOrdenados.length > 0 && (
        <div className={styles.chartWrapper}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>N°</th>
              <th>Evento</th>
              <th>Inscritos</th>
            </tr>
          </thead>
          <tbody>
            {eventosOrdenados && eventosOrdenados.length > 0 ? (
              eventosOrdenados.map((evento: any, idx: number) => (
                <tr key={evento.id_evento}>
                <td data-label="N°">{idx + 1}</td>
                  <td data-label="Evento">
                    {evento.nombre_evento} - {evento.fecha_hora}
                  </td>
                  <td data-label="Inscritos">
                    <ul className={styles.inscritosList}>
                      {evento.inscritos.map((inscrito: any, i: number) => (
                        <li key={i} className={styles.inscritoItem}>
                        {i + 1}. {inscrito.nombres_contratista} {inscrito.apellidos_contratista} 
                        {" - "}
                        {inscrito.cedula ? inscrito.cedula : inscrito.cedula_logueado}
                        {" "}
                        ({inscrito.email})
                      </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No hay datos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
