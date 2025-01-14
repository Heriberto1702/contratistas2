import React, { useState, useEffect } from "react";
import styles from "./css/EventosListados.module.css";
import Image from "next/image";

const EventList = () => {
  const [eventos, setEventos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch("/api/eventos/obtener");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setEventos(data);
        } else {
          throw new Error("La respuesta no es un array");
        }
      } catch (error: any) {
        setError(error.message || "Hubo un problema al cargar los eventos.");
        console.error("Error al obtener los eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  return (
    <div>
      {error ? (
        <p className={styles.errorMessage}>Error: {error}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Nombre del Evento</th>
              <th className={styles.th}>Ubicación</th>
              <th className={styles.th}>Cupos</th>
              <th className={styles.th}>Cupos Reservados</th>
              <th className={styles.th}>Fecha y Hora</th>
          <th className={styles.th}>Imagen</th> 
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.id_evento} className={styles.tr}>
                <td className={styles.td}>{evento.nombre_evento}</td>
                <td className={styles.td}>{evento.locacion}</td>
                <td className={styles.td}>{evento.cupos}</td>
                <td className={styles.td}>{evento.cupo_reservado ?? "N/A"}</td>
                <td className={styles.td}>
                  {new Date(evento.fecha_hora).toLocaleString()}
                </td>
                 <td className={styles.td}>
                  <Image
                    width={100}
                    height={100}
                    src={evento.imagen_evento}
                    alt={`Imagen de ${evento.nombre_evento}`}
                    className={styles.image}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventList;
